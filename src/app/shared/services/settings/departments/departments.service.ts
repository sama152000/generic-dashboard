import { Injectable } from '@angular/core';
import { GetPagedBody } from '../../../interfaces/get-paged/get-paged';
import { Observable, of } from 'rxjs';
import { HttpService } from '../../../../core/services';
import { environment } from '../../../../../environments/environment';
import { Department, Program, Faculty, Activity } from '../../../../pages/models/department-dto';

@Injectable({
    providedIn: 'root'
})
export class DepartmentsService extends HttpService {
    protected get baseUrl(): string {
        return environment.HOST_API + 'v1/departments/';
    }

    // Static mock data for testing
    private staticDepartments: Department[] = [
        {
            id: '1',
            name: 'Computer Science',
            shortName: 'CS',
            overview: 'Department of Computer Science focuses on programming, algorithms, and software development.',
            type: 'Academic',
            image: 'assets/img/departments/cs.jpg',
            contact: {
                email: 'cs@university.edu.sa',
                phone: '+966-11-1234567',
                office: 'Building 1, Room 101',
                headOfDepartment: 'Dr. Ahmed Mohamed'
            }
        },
        {
            id: '2',
            name: 'Mathematics',
            shortName: 'MATH',
            overview: 'Department of Mathematics covers pure and applied mathematics.',
            type: 'Academic',
            image: 'assets/img/departments/math.jpg',
            contact: {
                email: 'math@university.edu.sa',
                phone: '+966-11-1234568',
                office: 'Building 2, Room 201',
                headOfDepartment: 'Dr. Fatima Ali'
            }
        },
        {
            id: '3',
            name: 'Physics',
            shortName: 'PHYS',
            overview: 'Department of Physics explores the fundamental laws of nature.',
            type: 'Academic',
            image: 'assets/img/departments/physics.jpg',
            contact: {
                email: 'physics@university.edu.sa',
                phone: '+966-11-1234569',
                office: 'Building 3, Room 301',
                headOfDepartment: 'Dr. Khalid Abdullah'
            }
        }
    ];

    private staticPrograms: Program[] = [
        {
            id: '1',
            name: 'Bachelor of Computer Science',
            description: 'A comprehensive program in computer science covering software development, algorithms, and data structures.',
            duration: '4 years',
            degree: 'Bachelor'
        },
        {
            id: '2',
            name: 'Master of Mathematics',
            description: 'Advanced studies in pure and applied mathematics.',
            duration: '2 years',
            degree: 'Master'
        }
    ];

    private staticFaculty: Faculty[] = [
        {
            id: '1',
            name: 'Dr. Ahmed Mohamed',
            title: 'Professor',
            specialization: 'Software Engineering',
            email: 'ahmed.mohamed@university.edu.sa',
            photo: 'assets/img/faculty/ahmed.jpg'
        },
        {
            id: '2',
            name: 'Dr. Fatima Ali',
            title: 'Associate Professor',
            specialization: 'Applied Mathematics',
            email: 'fatima.ali@university.edu.sa',
            photo: 'assets/img/faculty/fatima.jpg'
        }
    ];

    private staticActivities: Activity[] = [
        {
            id: '1',
            title: 'AI Conference 2025',
            description: 'Annual conference on artificial intelligence and machine learning.',
            date: '2025-09-23',
            image: 'assets/img/activities/ai-conference.jpg'
        },
        {
            id: '2',
            title: 'Math Workshop',
            description: 'Workshop on advanced mathematical concepts.',
            date: '2025-10-15',
            image: 'assets/img/activities/math-workshop.jpg'
        }
    ];

    // Static data methods for testing
    getStaticDepartments(): Observable<Department[]> {
        return of(this.staticDepartments);
    }

    getStaticDepartment(id: string): Observable<Department | undefined> {
        const department = this.staticDepartments.find(d => d.id === id);
        return of(department);
    }

    getStaticPrograms(departmentId: string): Observable<Program[]> {
        return of(this.staticPrograms);
    }

    getStaticFaculty(departmentId: string): Observable<Faculty[]> {
        return of(this.staticFaculty);
    }

    getStaticActivities(departmentId: string): Observable<Activity[]> {
        return of(this.staticActivities);
    }

    // Original API methods - commented out for testing
    /*
    // Department Methods
    getDepartments(id: string): Observable<Department> {
        return this.get<Department>({ apiName: `get/${id}` });
    }

    getEditDepartments(id: string): Observable<Department> {
        return this.get<Department>({ apiName: `getEdit/${id}` });
    }

    get departments(): Observable<Department[]> {
        return this.get<Department[]>({ apiName: 'getAll' });
    }

    getDropDown(body: GetPagedBody<any>): Observable<any> {
        return this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
    }

    add(body: Department): Observable<Department> {
        return this.post<Department, Department>({ apiName: 'add', showAlert: true }, body);
    }

    update(body: Department): Observable<Department> {
        return this.put<Department,Department>({ apiName: 'update', showAlert: true }, body);
    }

    remove(id: string): Observable<any> {
        return this.delete({ apiName: `delete/`, showAlert: true }, id);
    }

    // Program Methods
    getPrograms(departmentId: string): Observable<Program[]> {
        return this.get<Program[]>({ apiName: `${departmentId}/programs` });
    }

    addProgram(departmentId: string, body: Program): Observable<Program> {
        return this.post<Program, Program>({ apiName: `${departmentId}/programs/add`, showAlert: true }, body);
    }

    updateProgram(departmentId: string, body: Program): Observable<Program> {
        return this.put<Program,Program>({ apiName: `${departmentId}/programs/update`, showAlert: true }, body);
    }

    removeProgram(departmentId: string, id: string): Observable<boolean> {
        return this.delete({ apiName: `${departmentId}/programs/delete/`, showAlert: true }, id);
    }

    // Faculty Methods
    getFaculty(departmentId: string): Observable<Faculty[]> {
        return this.get<Faculty[]>({ apiName: `${departmentId}/faculty` });
    }

    addFaculty(departmentId: string, body: Faculty): Observable<Faculty> {
        return this.post<Faculty, Faculty>({ apiName: `${departmentId}/faculty/add`, showAlert: true }, body);
    }

    updateFaculty(departmentId: string, body: Faculty): Observable<Faculty> {
        return this.put<Faculty,Faculty>({ apiName: `${departmentId}/faculty/update`, showAlert: true }, body);
    }

    removeFaculty(departmentId: string, id: string): Observable<boolean> {
        return this.delete({ apiName: `${departmentId}/faculty/delete/`, showAlert: true }, id);
    }

    // Activity Methods
    getActivities(departmentId: string): Observable<Activity[]> {
        return this.get<Activity[]>({ apiName: `${departmentId}/activities` });
    }

    addActivity(departmentId: string, body: Activity): Observable<Activity> {
        return this.post<Activity, Activity>({ apiName: `${departmentId}/activities/add`, showAlert: true }, body);
    }

    updateActivity(departmentId: string, body: Activity): Observable<Activity> {
        return this.put<Activity,Activity>({ apiName: `${departmentId}/activities/update`, showAlert: true }, body);
    }

    removeActivity(departmentId: string, id: string): Observable<boolean> {
        return this.delete({ apiName: `${departmentId}/activities/delete/`, showAlert: true }, id);
    }
    */
}