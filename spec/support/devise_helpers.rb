def sign_in_admin(admin)
  @request.env["devise.mapping"] = Devise.mappings[:admin]
  sign_in admin
end

def sign_in_student(student)
  @request.env["devise.mapping"] = Devise.mappings[:student]
  sign_in student
end
