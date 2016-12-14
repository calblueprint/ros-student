class Ability
  include CanCan::Ability

  def initialize(user)
    can [:verify], Code
  end
end
