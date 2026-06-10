export const calculatorData = [
    {
        name: "Web Programming",
        credits: 3,
        grade: "A0",
    },
    {
        name: "Data Structure and Lab",
        credits: 3,
        grade: "A+",
    },
    {
        name: "Engineering Mathematics 1",
        credits: 3,
        grade: "B+",
    },
];

export const pastGPA = [
    {
        semester: "Y1S1",
        credits: 15,
        gpa: 4.50
    },
    {
        semester: "Y1S2",
        credits: 21,
        gpa: 4.18
    },
    {
        semester: "Y2S1",
        credits: 18,
        gpa: 4.30
    },
];

export function getGPAstatus(gpa) {
    if(gpa == 4.50) return "Distinguished";
    if(gpa >= 4.00) return "Outstanding";
    if(gpa >= 3.50) return "Excellent";
    if(gpa >= 3.00) return "Good";
    if(gpa >= 2.50) return "Average";
    return "Needs improvement"
}

export const gradeOptions = [
    "A+",
    "A0",             
    "B+",             
    "B0",           
    "C+",            
    "C0",             
    "D+",           
    "D0",                  
    "F",                  
];

export const creditOptions = [
    "1",
    "2",
    "3",
    "4",          
];