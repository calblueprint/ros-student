class AdminAbility
  include CanCan::Ability

  def initialize(admin)
    admin ||= Admin.new

    can [
      :show,
      :create,
      :update,
      :destroy,
    ], Admin, id: admin.id

    can [
      :index,
    ], Admin

    can :manage, Course
    can :manage, Section
    can :manage, Subsection
    can :manage, Component
    can :manage, CodeCsv
  end
end
