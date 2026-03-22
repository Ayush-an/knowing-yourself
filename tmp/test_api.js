const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testConnection() {
  try {
    console.log('--- Testing API Connection ---');
    
    // 1. Signup test user
    const mobile = '1234567895';
    try {
      const signupRes = await axios.post(`${API_URL}/auth/signup`, {
        name: 'Test Connectivity User',
        mobile,
        password: 'password123',
        age: 30,
        gender: 'Other',
        occupation: 'AI Tester'
      });
      console.log('✅ Signup Success:', signupRes.data.message);
    } catch (err) {
      if (err.response?.data?.message === 'User already exists') {
        console.log('ℹ️ User already exists, skipping signup.');
      } else {
        throw err;
      }
    }

    // 2. Login test user
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      mobile,
      password: 'password123'
    });
    console.log('✅ Login Success: Token received.');
    const token = loginRes.data.token;

    // 3. Login as Admin
    const adminLoginRes = await axios.post(`${API_URL}/auth/login`, {
      mobile: '9999999999',
      password: 'admin123'
    });
    console.log('✅ Admin Login Success.');
    const adminToken = adminLoginRes.data.token;

    // 4. Get Questions
    const questionsRes = await axios.get(`${API_URL}/user/questions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Fetch Questions Success:', questionsRes.data.length, 'questions found.');

    console.log('--- Connection Test Passed ---');
  } catch (err) {
    console.error('❌ Connection Test Failed:', err.message);
    if (err.response) {
      console.error('   Status:', err.response.status);
      console.error('   Data:', err.response.data);
    }
    process.exit(1);
  }
}

testConnection();
