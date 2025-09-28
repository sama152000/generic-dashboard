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

    private useStaticData = false;

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
            degree: 'Bachelor',
            departmentId: '1'
        },
        {
            id: '2',
            name: 'Master of Mathematics',
            description: 'Advanced studies in pure and applied mathematics.',
            duration: '2 years',
            degree: 'Master',
            departmentId: '2'
        }
    ];

    private staticFaculty: Faculty[] = [
        {
            id: '1',
            name: 'Dr. Ahmed Mohamed',
            title: 'Professor',
            specialization: 'Software Engineering',
            email: 'ahmed.mohamed@university.edu.sa',
            photo: 'assets/img/faculty/ahmed.jpg',
            departmentId: '1'
        },
        {
            id: '2',
            name: 'Dr. Fatima Ali',
            title: 'Associate Professor',
            specialization: 'Applied Mathematics',
            email: 'fatima.ali@university.edu.sa',
            photo: 'assets/img/faculty/fatima.jpg',
            departmentId: '2'
        }
    ];

    private staticActivities: Activity[] = [
        {
            id: '1',
            title: 'AI Conference 2025',
            description: 'Annual conference on artificial intelligence and machine learning.',
            date: '2025-09-23',
            image: 'assets/img/activities/ai-conference.jpg',
            departmentId: '1'
        },
        {
            id: '2',
            title: 'Math Workshop',
            description: 'Workshop on advanced mathematical concepts.',
            date: '2025-10-15',
            image: 'assets/img/activities/math-workshop.jpg',
            departmentId: '2'
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
        return of(this.staticPrograms.filter(p => p.departmentId === departmentId));
    }

    getStaticFaculty(departmentId: string): Observable<Faculty[]> {
        return of(this.staticFaculty.filter(f => f.departmentId === departmentId));
    }

    getStaticActivities(departmentId: string): Observable<Activity[]> {
        return of(this.staticActivities.filter(a => a.departmentId === departmentId));
    }

    addStaticDepartment(body: Department): Observable<Department> {
        const newDepartment = { ...body, id: `${this.staticDepartments.length + 1}` };
        this.staticDepartments.push(newDepartment);
        return of(newDepartment);
    }

    updateStaticDepartment(body: Department): Observable<Department> {
        const index = this.staticDepartments.findIndex(d => d.id === body.id);
        if (index !== -1) {
            this.staticDepartments[index] = body;
            return of(body);
        }
        return of();
    }

    removeStaticDepartment(id: string): Observable<boolean> {
        const index = this.staticDepartments.findIndex(d => d.id === id);
        if (index !== -1) {
            this.staticDepartments.splice(index, 1);
            return of(true);
        }
        return of(false);
    }

    addStaticProgram(departmentId: string, body: Program): Observable<Program> {
        const newProgram = { ...body, id: `${this.staticPrograms.length + 1}`, departmentId };
        this.staticPrograms.push(newProgram);
        return of(newProgram);
    }

    updateStaticProgram(departmentId: string, body: Program): Observable<Program> {
        const index = this.staticPrograms.findIndex(p => p.id === body.id && p.departmentId === departmentId);
        if (index !== -1) {
            this.staticPrograms[index] = body;
            return of(body);
        }
        return of();
    }

    removeStaticProgram(departmentId: string, id: string): Observable<boolean> {
        const index = this.staticPrograms.findIndex(p => p.id === id && p.departmentId === departmentId);
        if (index !== -1) {
            this.staticPrograms.splice(index, 1);
            return of(true);
        }
        return of(false);
    }

    addStaticFaculty(departmentId: string, body: Faculty): Observable<Faculty> {
        const newFaculty = { ...body, id: `${this.staticFaculty.length + 1}`, departmentId };
        this.staticFaculty.push(newFaculty);
        return of(newFaculty);
    }

    updateStaticFaculty(departmentId: string, body: Faculty): Observable<Faculty> {
        const index = this.staticFaculty.findIndex(f => f.id === body.id && f.departmentId === departmentId);
        if (index !== -1) {
            this.staticFaculty[index] = body;
            return of(body);
        }
        return of();
    }

    removeStaticFaculty(departmentId: string, id: string): Observable<boolean> {
        const index = this.staticFaculty.findIndex(f => f.id === id && f.departmentId === departmentId);
        if (index !== -1) {
            this.staticFaculty.splice(index, 1);
            return of(true);
        }
        return of(false);
    }

    addStaticActivity(departmentId: string, body: Activity): Observable<Activity> {
        const newActivity = { ...body, id: `${this.staticActivities.length + 1}`, departmentId };
        this.staticActivities.push(newActivity);
        return of(newActivity);
    }

    updateStaticActivity(departmentId: string, body: Activity): Observable<Activity> {
        const index = this.staticActivities.findIndex(a => a.id === body.id && a.id === departmentId);
        if (index !== -1) {
            this.staticActivities[index] = body;
            return of(body);
        }
        return of();
    }

    removeStaticActivity(departmentId: string, id: string): Observable<boolean> {
        const index = this.staticActivities.findIndex(a => a.id === id && a.id === departmentId);
        if (index !== -1) {
            this.staticActivities.splice(index, 1);
            return of(true);
        }
        return of(false);
    }


    get departments(): Observable<Department[]> {
        return this.useStaticData
            ? this.getStaticDepartments()
            : this.get<Department[]>({ apiName: 'getAll' });
    }

    getDropDown(body: GetPagedBody<any>): Observable<any> {
        return this.useStaticData
            ? of(this.staticDepartments.map(d => ({ id: d.id, name: d.name })))
            : this.dropdownPost<any, any>({ apiName: `getdropdown`, showAlert: true }, body);
    }

    add(body: Department): Observable<Department> {
        return this.useStaticData
            ? this.addStaticDepartment(body)
            : this.post<Department, Department>({ apiName: 'add', showAlert: true }, body);
    }

    update(body: Department): Observable<Department> {
        return this.useStaticData
            ? this.updateStaticDepartment(body)
            : this.put<Department, Department>({ apiName: 'update', showAlert: true }, body);
    }

    remove(id: string): Observable<any> {
        return this.useStaticData
            ? this.removeStaticDepartment(id)
            : this.delete({ apiName: `delete/`, showAlert: true }, id);
    }

    // Program Methods
    getPrograms(departmentId: string): Observable<Program[]> {
        return this.useStaticData
            ? this.getStaticPrograms(departmentId)
            : this.get<Program[]>({ apiName: `${departmentId}/programs` });
    }

    addProgram(departmentId: string, body: Program): Observable<Program> {
        return this.useStaticData
            ? this.addStaticProgram(departmentId, body)
            : this.post<Program, Program>({ apiName: `${departmentId}/programs/add`, showAlert: true }, body);
    }

    updateProgram(departmentId: string, body: Program): Observable<Program> {
        return this.useStaticData
            ? this.updateStaticProgram(departmentId, body)
            : this.put<Program, Program>({ apiName: `${departmentId}/programs/update`, showAlert: true }, body);
    }

    removeProgram(departmentId: string, id: string): Observable<boolean> {
        return this.useStaticData
            ? this.removeStaticProgram(departmentId, id)
            : this.delete({ apiName: `${departmentId}/programs/delete/`, showAlert: true }, id);
    }

    // Faculty Methods
    getFaculty(departmentId: string): Observable<Faculty[]> {
        return this.useStaticData
            ? this.getStaticFaculty(departmentId)
            : this.get<Faculty[]>({ apiName: `${departmentId}/faculty` });
    }

    addFaculty(departmentId: string, body: Faculty): Observable<Faculty> {
        return this.useStaticData
            ? this.addStaticFaculty(departmentId, body)
            : this.post<Faculty, Faculty>({ apiName: `${departmentId}/faculty/add`, showAlert: true }, body);
    }

    updateFaculty(departmentId: string, body: Faculty): Observable<Faculty> {
        return this.useStaticData
            ? this.updateStaticFaculty(departmentId, body)
            : this.put<Faculty, Faculty>({ apiName: `${departmentId}/faculty/update`, showAlert: true }, body);
    }

    removeFaculty(departmentId: string, id: string): Observable<boolean> {
        return this.useStaticData
            ? this.removeStaticFaculty(departmentId, id)
            : this.delete({ apiName: `${departmentId}/faculty/delete/`, showAlert: true }, id);
    }

    // Activity Methods
    getActivities(departmentId: string): Observable<Activity[]> {
        return this.useStaticData
            ? this.getStaticActivities(departmentId)
            : this.get<Activity[]>({ apiName: `${departmentId}/activities` });
    }

    addActivity(departmentId: string, body: Activity): Observable<Activity> {
        return this.useStaticData
            ? this.addStaticActivity(departmentId, body)
            : this.post<Activity, Activity>({ apiName: `${departmentId}/activities/add`, showAlert: true }, body);
    }

    updateActivity(departmentId: string, body: Activity): Observable<Activity> {
        return this.useStaticData
            ? this.updateStaticActivity(departmentId, body)
            : this.put<Activity, Activity>({ apiName: `${departmentId}/activities/update`, showAlert: true }, body);
    }

    removeActivity(departmentId: string, id: string): Observable<boolean> {
        return this.useStaticData
            ? this.removeStaticActivity(departmentId, id)
            : this.delete({ apiName: `${departmentId}/activities/delete/`, showAlert: true }, id);
    }

    getEditDepartments(id: string): Observable<Department | undefined> {
        return this.useStaticData
            ? this.getStaticDepartment(id)
            : this.get<Department>({ apiName: `get/${id}` });
    }
}
