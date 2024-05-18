import { supabaseServer } from '~/server/supabase'

export const deleteFiles = async (from:string, fileNames: string[]) => {

  console.log('deleting', fileNames)
  return supabaseServer
    .storage
    .from(from)
    .remove(fileNames)
}