module ApplicationHelper
  def user
    if current_admin
      AdminSerializer.new(current_admin, root: false).to_json
    elsif current_student
      StudentSerializer.new(current_student, root: false).to_json
    end
  end

  def error(error)
    if error
      ErrorSerializer.new(error, root: false).to_json
    end
  end

  def flashes(flash)
    if flash
      flash.keys.each_with_object({}) { |key, obj| obj[key] = flash[key] }.to_json
    end
  end
end
