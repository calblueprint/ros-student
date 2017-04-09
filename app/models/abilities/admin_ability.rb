class AdminAbility
  include CanCan::Ability

  def initialize(admin)
    admin ||= Admin.new

    can [
      :show,
      :update,
      :destroy,
    ], Admin, id: admin.id

    can [
      :index,
      :create,
      :destroy,
    ], Admin

    can [
      :index,
      :destroy,
    ], Student

    can :manage, Course
    can :manage, Section
    can :manage, Subsection
    can :manage, Component
    can :manage, CodeCsv
    can :manage, Request
  end
end
