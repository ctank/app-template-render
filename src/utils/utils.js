import { TextToCode, CodeToText } from '../lib/chinaAreaData/index'
import { setValueByPath } from './common'

export default {
  cascader: {
    areaDataCodeToText: CodeToText,
    areaDataTextToCode: TextToCode
  },
  setValue: setValueByPath
}
