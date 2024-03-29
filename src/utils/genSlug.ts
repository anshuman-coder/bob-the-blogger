import ShortUniqueId, { type ShortUniqueIdDefaultDictionaries } from 'short-unique-id'
import slugify from 'slugify'

const ShortUnq = new ShortUniqueId()

export const genUid = (dic: ShortUniqueIdDefaultDictionaries, len: number) => {
  ShortUnq.setDictionary(dic)
  return ShortUnq.rnd(len)
}

export const genUserName = (name: string | null | undefined) => {
  if(!name) return ''
  return slugify(name) + '-' + genUid('number', 8)
}

export const genPostSlug = (title: string) => {
  return genUserName(title)
}