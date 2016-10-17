class ErrorSerializer < BaseMessageSerializer
  has_many :form_errors, each_serializer: FormErrorSerializer
  has_many :form_fields, each_serializer: FormFieldSerializer
end
