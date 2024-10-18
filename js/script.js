import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const auth = getAuth();


  // Função para cadastrar um novo usuário
async function cadastrarUsuario(email, senha) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Adiciona o usuário ao Firestore com o campo isApproved como false
        await addDoc(collection(db, "usuarios"), {
            uid: user.uid,
            email: user.email,
            isApproved: false  // Usuário não aprovado inicialmente
        });

        console.log("Usuário cadastrado com ID: ", user.uid);
        alert("Usuário cadastrado com sucesso! Aguarde a liberação do administrador.");
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.error("Erro: Este email já está em uso.");
            document.getElementById("signupErrorMessage").style.display = "block";
            document.getElementById("signupErrorMessage").textContent = "Este email já está cadastrado.";
        } else if (error.code === 'auth/weak-password') {
            console.error("Erro: A senha deve ter pelo menos 6 caracteres.");
            document.getElementById("signupErrorMessage").style.display = "block";
            document.getElementById("signupErrorMessage").textContent = "A senha deve ter pelo menos 6 caracteres.";
        } else {
            console.error("Erro ao cadastrar usuário: ", error);
            document.getElementById("signupErrorMessage").style.display = "block";
            document.getElementById("signupErrorMessage").textContent = error.message;
        }
    }
}

    
// Função para fazer login
    async function loginUsuario(email, senha) {
      try {
          // Remove espaços em branco
          email = email.trim();
          senha = senha.trim();

          // Tenta fazer login com o Firebase Authentication
          const userCredential = await signInWithEmailAndPassword(auth, email, senha);
          const user = userCredential.user;

          // Verifica se o usuário está aprovado no Firestore
          const querySnapshot = await getDocs(collection(db, "usuarios"));
          let isApproved = false;

          querySnapshot.forEach((doc) => {
              const userData = doc.data();
              if (userData.uid === user.uid) {
                  isApproved = userData.isApproved;
              }
          });

          if (!isApproved) {
              document.getElementById("errorMessage").style.display = "block";
              document.getElementById("errorMessage").innerHTML = "Poxa, que pena 😢<br> O usuário ainda não foi aprovado. Aguarde a aprovação.";
            } else {
              console.log("Login bem-sucedido!");
              // Redireciona o usuário para a página desejada
              window.location.href = "pagina_alunos.html";
          }
      } catch (error) {
          console.error("Erro ao fazer login: ", error);

          // Trate os erros específicos
          if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
              document.getElementById("errorMessage").style.display = "block";
              document.getElementById("errorMessage").textContent = "Usuário ou senha inválidos."; // Mensagem unificada
          } else if (error.code === 'auth/too-many-requests') {
              document.getElementById("errorMessage").style.display = "block";
              document.getElementById("errorMessage").innerHTML = "Você foi bloqueado devido a muitas tentativas.<br> Entre em contato com o administrador.";
          } else if (error.code === 'auth/invalid-email') {
              document.getElementById("errorMessage").style.display = "block";
              document.getElementById("errorMessage").textContent = "Email inválido. Verifique o formato.";
          } else if (error.code === 'auth/invalid-credential') {
              document.getElementById("errorMessage").style.display = "block";
              document.getElementById("errorMessage").innerHTML = "Credenciais inválidas.<br> Verifique se o email e a senha estão corretos.";
          } else {
              document.getElementById("errorMessage").style.display = "block";
              document.getElementById("errorMessage").textContent = error.message; // Exibe mensagem de erro genérica
          }
      }
}


    // Verifica se o formulário de cadastro existe
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            // Chama a função de cadastro
            await cadastrarUsuario(email, senha);
        });
    }

    // Verifica se o formulário de login existe
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('emailLogin').value;
            const senha = document.getElementById('senhaLogin').value;

            // Chama a função de login
            await loginUsuario(email, senha);
        });
    }
});
