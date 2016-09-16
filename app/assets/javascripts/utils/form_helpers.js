class FormHelpers {
  static getCSRFFieldName() {
    return document.querySelector('meta[name="csrf-param"]').content
  }

  static getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').content
  }
}
