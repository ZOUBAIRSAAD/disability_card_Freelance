const API_BASE_URL = 'http://localhost:5253/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  expiresAt: string;
}

export interface AdminProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  profilePicture?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface DashboardStats {
  totalApplications: number;
  disabilityApplications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  carersApplications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  customerSupportApplications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  recentApplications: Array<{
    id: number;
    name: string;
    type: string;
    status: string;
    createdAt: string;
  }>;
}

export interface DisabilityApplication {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  address: string;
  city: string;
  emirate: string;
  disabilityType: string;
  disabilityDescription: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  applicationStatus: string;
  createdAt: string;
  medicalDocuments: Array<{
    id: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    fileType: string;
    uploadedAt: string;
  }>;
}

export interface CarersApplication {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  address: string;
  city: string;
  emirate: string;
  careRecipientName: string;
  relationshipToRecipient: string;
  caregivingExperience: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  applicationStatus: string;
  createdAt: string;
}

export interface CustomerSupportApplication {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  address: string;
  city: string;
  emirate: string;
  supportType: string;
  supportDescription: string;
  specialRequirements: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  applicationStatus: string;
  createdAt: string;
}

class AdminAPI {
  private getAuthHeaders() {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  private getAuthHeadersForUpload() {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('adminToken', data.token);
    return data;
  }

  async getProfile(): Promise<AdminProfile> {
    const response = await fetch(`${API_BASE_URL}/admin/profile`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  }

  async updateProfile(profileData: FormData): Promise<AdminProfile> {
    const response = await fetch(`${API_BASE_URL}/admin/profile`, {
      method: 'PUT',
      headers: this.getAuthHeadersForUpload(),
      body: profileData,
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const result = await response.json();
    return result.admin || result;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        currentPassword,
        newPassword
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to change password');
    }
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    return response.json();
  }

  // Disability Applications
  async getDisabilityApplications(page = 1, pageSize = 10, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await fetch(`${API_BASE_URL}/admin/applications/disability?${params}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch disability applications');
    }

    return response.json();
  }

  async getDisabilityApplicationById(id: number): Promise<DisabilityApplication> {
    const response = await fetch(`${API_BASE_URL}/admin/applications/disability/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch disability application');
    }

    return response.json();
  }

  // Carers Applications
  async getCarersApplications(page = 1, pageSize = 10, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await fetch(`${API_BASE_URL}/admin/applications/carers?${params}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch carers applications');
    }

    return response.json();
  }

  async getCarersApplicationById(id: number): Promise<CarersApplication> {
    const response = await fetch(`${API_BASE_URL}/admin/applications/carers/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch carers application');
    }

    return response.json();
  }

  // Customer Support Applications
  async getCustomerSupportApplications(page = 1, pageSize = 10, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await fetch(`${API_BASE_URL}/admin/applications/customer-support?${params}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer support applications');
    }

    return response.json();
  }

  async getCustomerSupportApplicationById(id: number): Promise<CustomerSupportApplication> {
    const response = await fetch(`${API_BASE_URL}/admin/applications/customer-support/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer support application');
    }

    return response.json();
  }

  // Common application operations
  async updateApplicationStatus(type: 'disability' | 'carers' | 'customer-support', id: number, status: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/applications/${type}/${id}/status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update application status');
    }
  }

  async deleteApplication(type: 'disability' | 'carers' | 'customer-support', id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/applications/${type}/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete application');
    }
  }

  // Medical document viewing
  async getDocumentUrl(documentId: number): Promise<string> {
    return `${API_BASE_URL}/admin/documents/${documentId}`;
  }

  logout() {
    localStorage.removeItem('adminToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('adminToken');
    return !!token;
  }
}

export const adminAPI = new AdminAPI();
