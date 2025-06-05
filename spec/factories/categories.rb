FactoryBot.define do
  factory :category do
    sequence(:name) { |n| "#{Faker::Commerce.department(max: 1, fixed_amount: true)} #{n}" }
  end
end
