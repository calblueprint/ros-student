class AdminAbility
  include CanCan::Ability

  def initialize(admin)
    admin ||= Admin.new

    can [
      :index,
      :show,
      :create,
      :update,
      :destroy,
    ], Admin, id: admin.id
  end
end
