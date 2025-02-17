const API_BASE_URL = 'http://localhost:8080/api';

const getToken = async () => {
    try {
        const credentials = btoa("MAR200575:geheim1");
        const response = await fetch("http://localhost:8080/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch token: ${response.statusText}`);
        }

        const token = await response.text();
        if (!token) {
            throw new Error('Token is empty or invalid');
        }

        return token;
    } catch (error) {
        throw error;
    }
};

const fetchDataWithToken = async (endpoint, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchData = async (endpoint) => {
    try {
        const token = await getToken();
        return await fetchDataWithToken(endpoint, token);
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const postData = async (endpoint, body) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Error sending data: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateData = async (endpoint, body) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Error updating data: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error deleting data: ${response.statusText}`);
        }

        return 'Data successfully deleted.';
    } catch (error) {
        throw error;
    }
};