import jsdom from 'jsdom'

const exposedProperties = ['window', 'navigator', 'document']

global.jsdom = jsdom.jsdom
global.document = global.jsdom('<!doctype html><html><body></body></html>')
global.window = global.document.defaultView
global.XMLHttpRequest = global.window.XMLHttpRequest

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.sinon = require('sinon')
global.sinon.useFakeXMLHttpRequest()
global.window.XMLHttpRequest = global.XMLHttpRequest
global.$ = require('jquery')(global.window)

global.navigator = {
  userAgent: 'node.js'
}

const documentRef = document
