async function probe() {
  const baseUrl = 'http://localhost:5023/api';
  try {
    const res = await fetch(baseUrl + '/order');
    if (res.ok) {
      const data = await res.json();
      console.log('Sample order structure:');
      console.log(JSON.stringify(data[0], null, 2));
    } else {
      console.log('Failed to fetch orders:', res.status);
    }
  } catch (err) {
    console.log('Error:', err.message);
  }
}

probe();
