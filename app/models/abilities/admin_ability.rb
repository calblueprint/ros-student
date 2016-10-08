class AdminAbility
  include CanCan::Ability

  def initialize(admin)
    admin ||= Admin.new

    can [
      :index,
      :show,
      :create,
      :update,
      :destroy
    ], Admin, id: admin.id

    can [
      :create,
      :update,
      :destroy
    ], Course

    can [
      :create,
      :update,
      :destroy
    ], Section

    can [
      :create,
      :update,
      :destroy
    ], Subsection
  end
end
