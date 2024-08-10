// Initialize Supabase
const supabaseUrl = 'https://zglbfzrucwtobuqvlhpi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnbGJmenJ1Y3d0b2J1cXZsaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzMDM0MTcsImV4cCI6MjAzODg3OTQxN30.IHqZOxX2C-0tg1BgNMcuNbAHx0H2y3GPeM6SEp1bHD0';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Chatbot logic
document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('chatbot-container');

    function askUserName() {
        const question = document.createElement('p');
        question.textContent = 'What is your name?';
        chatbotContainer.appendChild(question);

        const input = document.createElement('input');
        input.type = 'text';
        chatbotContainer.appendChild(input);

        const button = document.createElement('button');
        button.textContent = 'Submit';
        chatbotContainer.appendChild(button);

        button.addEventListener('click', function() {
            const name = input.value;
            askUserDiseases(name);
        });
    }

    function askUserDiseases(name) {
        chatbotContainer.innerHTML = ''; // Clear the previous content

        const question = document.createElement('p');
        question.textContent = `Hello, ${name}. Please list the diseases you have:`;
        chatbotContainer.appendChild(question);

        const input = document.createElement('textarea');
        chatbotContainer.appendChild(input);

        const button = document.createElement('button');
        button.textContent = 'Submit';
        chatbotContainer.appendChild(button);

        button.addEventListener('click', function() {
            const diseases = input.value;
            saveUserData(name, diseases);
        });
    }

    function saveUserData(name, diseases) {
        supabase.from('users').insert([
            { name: name, diseases: diseases }
        ]).then(response => {
            chatbotContainer.innerHTML = '<p>Your data has been saved!</p>';
        }).catch(error => {
            chatbotContainer.innerHTML = '<p>There was an error saving your data.</p>';
        });
    }

    askUserName(); // Start the chatbot interaction
});
