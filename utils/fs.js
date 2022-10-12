import * as fs from './../shared/fs'
import { TODO_FILE_NAME } from './constants'

export function readFileSync(name) {
  const resData = fs.readFileSync(name)
  return !resData ? [] : JSON.parse(resData)
}

export function writeFileSync(data, merge = true,name) {
  let params = data
  if (merge) {
    params = [
      ...readFileSync(),
      ...data,
    ]
  }
  fs.writeFileSync(name, JSON.stringify(params))
}