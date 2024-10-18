const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Registrar usuário no Firebase Auth
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Usuário registrado com sucesso
        const user = userCredential.user;
        console.log('Usuário registrado:', user);

        // Você pode salvar informações extras no banco de dados aqui
    })
    .catch((error) => {
        console.error('Erro ao registrar:', error);
    });
});
