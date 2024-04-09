async function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      // assuming you have form fields for name and email
      name: event.target.name.value,
      email: event.target.email.value,
    };
    console.log(formData)
    try {
      const response = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}, ${response.json()}`);
      }
  
      const result = await response.json();
      console.log('User added:', result);
      // Handle success scenario (e.g., show success message)
    } catch (error) {
      console.error('Failed to add user:', error);
      // Handle error scenario (e.g., show error message)
    }
  }
export default handleSubmit