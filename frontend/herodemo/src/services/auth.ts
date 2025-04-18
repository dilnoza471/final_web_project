// This file will contain the API calls for authentication

interface LoginCredentials {
    email: string
    password: string
    rememberMe?: boolean
}

interface LoginResponse {
    user: {
        id: string
        email: string
        name: string
    }
    token: string
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
    // This is where you would make the actual API call to your backend
    // Example:
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(credentials),
    // });

    // if (!response.ok) {
    //   const error = await response.json();
    //   throw new Error(error.message || 'Login failed');
    // }

    // return response.json();

    // For now, we'll return a mock response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: {
                    id: "1",
                    email: credentials.email,
                    name: "John Doe",
                },
                token: "mock-jwt-token",
            })
        }, 1000)
    })
}

export async function logoutUser(): Promise<void> {
    // Example:
    // await fetch('/api/logout', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${getToken()}`,
    //   },
    // });

    // Clear local storage or cookies
    localStorage.removeItem("token")
}

export function getToken(): string | null {
    return localStorage.getItem("token")
}

export function setToken(token: string): void {
    localStorage.setItem("token", token)
}

export function isAuthenticated(): boolean {
    return !!getToken()
}
