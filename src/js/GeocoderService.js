import {HotballoonService} from '@flexio-oss/hotballoon'
import {TypeCheck} from '@flexio-oss/flex-types'
import {isString} from '@flexio-oss/assert'

const apiUrl = 'https://nominatim.openstreetmap.org/'

export class GeocoderService extends HotballoonService {
  /**
   * @return {string}
   */
  static name() {
    return 'GECOCODER'
  }

  /**
   * @param {string|ObjectValue} value
   * @param {function} clb
   */
  get(value, clb) {
    if (TypeCheck.isObjectValue(value)) {
      const lat = value.numberValue('latitude')
      const lon = value.numberValue('longitude')
      const query = `lat=${lat}&lon=${lon}`
      this.__request(`reverse?${query}&format=json`, clb)

    } else if (isString(value)) {
      this.__request(`search/${value}?format=json`, clb)
    } else {
      throw new Error('Value, should be a string or object value (geoloc)')
    }
  }

  __request(query, clb) {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        clb(JSON.parse(xhttp.responseText))
      }
    }
    const url = `${apiUrl}${query}`
    xhttp.open('GET', url, true)
    xhttp.send()
  }

  /**
   *
   * @return {string}
   */
  name() {
    return GeocoderService.name()
  }

  remove() {

  }
}

export const SERVICE_NAME_GEOCODER = GeocoderService.name()
