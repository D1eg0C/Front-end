const USERS_PER_PAGE = 5;
let currentPage = 1;

// Função para buscar e exibir usuários da página atual
async function fetchUsers(page = 1, limit = USERS_PER_PAGE) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const allUsers = await response.json();

        // Paginação simulada com slice
        const startIndex = (page - 1) * limit;
        const paginatedUsers = allUsers.slice(startIndex, startIndex + limit);

        displayUsers(paginatedUsers);
        updatePaginationButtons(allUsers.length, page, limit);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
}

// Exibe a lista de usuários na tela
function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.name;
        listItem.onclick = () => showUserDetails(user);
        userList.appendChild(listItem);
    });
}

// Mostra os detalhes de um usuário específico
function showUserDetails(user) {
    const userDetails = document.getElementById('user-details');
    userDetails.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Telefone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        <p><strong>Endereço:</strong> ${user.address.street}, ${user.address.city}</p>
    `;
}

// Atualiza os botões de paginação
function updatePaginationButtons(totalUsers, page, limit) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page * limit >= totalUsers;

    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            fetchUsers(currentPage);
        }
    };

    nextBtn.onclick = () => {
        if (currentPage * limit < totalUsers) {
            currentPage++;
            fetchUsers(currentPage);
        }
    };
}

// Chama a função ao carregar a página
fetchUsers(currentPage);