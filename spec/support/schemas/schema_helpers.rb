# Basic Serializer Properties
INTEGER = 'integer'
STRING = 'string'
NULL = 'null'
OBJECT = 'object'
BOOLEAN = 'boolean'
ARRAY = 'array'
EMPTY = ''


def extend_schema(old_schema, required=[], properties={})
  schema = old_schema.deep_dup
  required.each { |required| schema[:required] << required }
  properties.each { |key, value| schema[:properties][key] = value }
  schema
end
