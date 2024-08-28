import { useCallback, useMemo, useState } from 'react'
import { supabaseClient as supabase } from '~/config/supabase'
import { env } from '~/env'
import { genUid } from '~/utils/genSlug'

type StorageResponse = {
  data: {
    fullPath: string,
    path: string,
    id: string
  };
  error: null
} | {
  data: null
  error: {
    name: string,
    message: string,
    status: string,
  };
}



const useUpload = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getFullPath = useCallback((path?: string) => {
    if(path) {
      return (env.NEXT_PUBLIC_STORAGE_URL + path).trim()
    }

    return ''
  }, [])

  const uploadFeatureImage = useCallback(async (_file: File | Blob, _refId: string) => {

    const uid = genUid('hex', 10)
    const fileName = `${_refId}-${uid}.${_file.type.replaceAll('image/', '')}`.trim()

    const res = await supabase
      .storage
      .from('feature_image')
      .upload(`/public/${fileName}`, _file)

    return res
  }, [])

  const uploadProfileImage = useCallback(async (_file: File | Blob, _refId: string) => {
    const fileName = `${_refId}.${_file.type.replaceAll('image/', '')}`.trim()

    const check = await supabase
      .storage
      .from('feature_image')
      .list(`/public/${fileName}`)

    if(check.data) {
      return check
    }

    const res = await supabase
      .storage
      .from('profile_image')
      .upload(`/public/${fileName}`, _file)

    return res
  }, [])

  /**
   * @description
   * This function will be used to universalize the upload file function
   * on client side.
   * @param {object} _config - will have _file, _for and _refId(this could be postId or userId)
   * @param {Promise} onResolve - This function is optional it will conduct the onResolve requirement if any with res in the param
   */
  const upload = useCallback(async (_config: {
    _file: File | Blob,
    _for: 'post' | 'profile',
    _refId: string
  }, onResolve?: (data: StorageResponse) => Promise<void>) => {
    const { _file, _for, _refId } = _config
    setIsLoading(true)
    let data
    if(_for === 'post') data = await uploadFeatureImage(_file, _refId)
    if(_for === 'profile') data = await uploadProfileImage(_file, _refId)
    await onResolve?.(data as unknown as StorageResponse)
    setIsLoading(false)
    return data as StorageResponse
  }, [uploadFeatureImage, uploadProfileImage])

  return useMemo(() => ({
    upload,
    isLoading,
    getFullPath,
  }), [getFullPath, isLoading, upload])
}

export default useUpload