const API_BASE_URL = 'http://localhost:5253/api';

export interface DisabilityApplicationRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  emirate: string;
  disabilityType: string;
  disabilityDescription: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalDocuments?: File[];
}

export interface CarersApplicationRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  emirate: string;
  careRecipientName: string;
  relationshipToRecipient: string;
  caregivingExperience: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface CustomerSupportApplicationRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  emirate: string;
  supportType: string;
  supportDescription: string;
  specialRequirements: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface ApplicationResponse {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  emiratesId: string;
  disabilityType: string;
  disabilityDescription?: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  emirate: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  applicationStatus: string;
  createdAt: string;
  updatedAt?: string;
}

class ApplicationAPI {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Request failed');
    }

    return response.json();
  }

  async submitDisabilityApplication(application: DisabilityApplicationRequest): Promise<ApplicationResponse> {
    // First, submit the application data without files
    const { medicalDocuments, ...applicationData } = application;
    
    // Transform field names to PascalCase for .NET backend
    const transformedData = {
      FirstName: applicationData.firstName,
      LastName: applicationData.lastName,
      DateOfBirth: applicationData.dateOfBirth,
      Gender: applicationData.gender,
      Nationality: applicationData.nationality,
      EmiratesId: applicationData.emiratesId,
      PhoneNumber: applicationData.phoneNumber,
      Email: applicationData.email,
      Address: applicationData.address,
      City: applicationData.city,
      Emirate: applicationData.emirate,
      DisabilityType: applicationData.disabilityType,
      DisabilityDescription: applicationData.disabilityDescription,
      EmergencyContactName: applicationData.emergencyContactName,
      EmergencyContactPhone: applicationData.emergencyContactPhone
    };
    
    const response = await this.makeRequest<ApplicationResponse>('/DisabilityApplication', {
      method: 'POST',
      body: JSON.stringify(transformedData),
    });

    // If there are medical documents, upload them separately
    if (medicalDocuments && medicalDocuments.length > 0) {
      for (const file of medicalDocuments) {
        await this.uploadMedicalDocument(response.id, file);
      }
    }

    return response;
  }

  async uploadMedicalDocument(applicationId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/DisabilityApplication/${applicationId}/medical-documents`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'File upload failed');
    }
  }

  async submitCarersApplication(application: CarersApplicationRequest): Promise<ApplicationResponse> {
    // Transform field names to PascalCase for .NET backend
    const transformedData = {
      FirstName: application.firstName,
      LastName: application.lastName,
      DateOfBirth: application.dateOfBirth,
      Gender: application.gender,
      Nationality: application.nationality,
      EmiratesId: application.emiratesId,
      PhoneNumber: application.phoneNumber,
      Email: application.email,
      Address: application.address,
      City: application.city,
      Emirate: application.emirate,
      CareRecipientName: application.careRecipientName,
      RelationshipToRecipient: application.relationshipToRecipient,
      CaregivingExperience: application.caregivingExperience,
      EmergencyContactName: application.emergencyContactName,
      EmergencyContactPhone: application.emergencyContactPhone
    };

    return this.makeRequest<ApplicationResponse>('/CarersApplication', {
      method: 'POST',
      body: JSON.stringify(transformedData),
    });
  }

  async submitCustomerSupportApplication(application: CustomerSupportApplicationRequest): Promise<ApplicationResponse> {
    // Transform field names to PascalCase for .NET backend
    const transformedData = {
      FirstName: application.firstName,
      LastName: application.lastName,
      DateOfBirth: application.dateOfBirth,
      Gender: application.gender,
      Nationality: application.nationality,
      EmiratesId: application.emiratesId,
      PhoneNumber: application.phoneNumber,
      Email: application.email,
      Address: application.address,
      City: application.city,
      Emirate: application.emirate,
      SupportType: application.supportType,
      SupportDescription: application.supportDescription,
      SpecialRequirements: application.specialRequirements,
      EmergencyContactName: application.emergencyContactName,
      EmergencyContactPhone: application.emergencyContactPhone
    };

    return this.makeRequest<ApplicationResponse>('/CustomerSupportApplication', {
      method: 'POST',
      body: JSON.stringify(transformedData),
    });
  }
}

export const applicationAPI = new ApplicationAPI();
