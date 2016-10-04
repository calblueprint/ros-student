class BaseStudentSerializer < ActiveModel::Serializer
  attributes :email, :username, :first_name, :last_name
end
