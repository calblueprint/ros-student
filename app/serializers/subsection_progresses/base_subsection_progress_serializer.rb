class BaseSubsectionProgressSerializer < ActiveModel::Serializer
  attributes :id,
             :student_id,
             :subsection_id,
             :completed
end
