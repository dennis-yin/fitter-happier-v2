require 'rails_helper'

describe 'POST to /auth/sign_in', type: :request do

  it 'returns http success with valid credentials' do
    post '/auth/sign_in', params: { email: 'fake@email.com', password: 'password' }
    expect(response).to have_http_status(:success)
  end

  it 'returns a 401 status with invalid credentials' do
    post '/auth/sign_in', params: { email: 'not_valid@email.com', password: 'bad_password' }
    expect(response).to have_http_status(401)
  end

end
