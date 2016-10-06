module ApplicationHelper
  def user
    if current_admin
      AdminSerializer.new(current_admin, root: false).to_json
    elsif current_student
      StudentSerializer.new(current_student, root: false).to_json
    end
  end
end
