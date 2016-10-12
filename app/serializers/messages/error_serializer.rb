class ErrorSerializer < BaseMessageSerializer
  has_many :form_errors, each_serializer: FormErrorSerializer
end
