def sign_in_admin(admin)
  @request.env["devise.mapping"] = Devise.mappings[:admin]
  sign_in admin
end
