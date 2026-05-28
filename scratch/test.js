async function testWeb3Forms() {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: "6d54206f-8a7a-4024-8657-4408a5fe42b2",
        name: "Antigravity Diagnostics",
        email: "test@example.com",
        message: "This is a direct API override test."
      })
    });
    
    const result = await response.text();
    console.log("Response text:", result);
  } catch (error) {
    console.error("Transmission Error:", error);
  }
}

testWeb3Forms();
