export const goals = [
    { name: "Summa Cum Laude", targetGPA: 4.20 },
    { name: "Magna Cum Laude", targetGPA: 4.00 },
    { name: "Cum Laude", targetGPA: 3.75 },
    { name: "Graduation Prize", targetGPA: 3.50 },
];

export function getGpaMessage(rawGpa, maxGpa) {
    if (rawGpa < 1.0) {
        return "You're already comfortably above this graduation target.";
    }
    if (rawGpa <= 2.0) {
        return "This target is achievable with steady effort.";
    }
    if (rawGpa <= 3.0) {
        return "Maintaining satisfactory performance should be sufficient to reach this target.";
    }
    if (rawGpa <= 3.5) {
        return "Reaching this target will require steady academic performance.";
    }
    if (rawGpa <= 4.0) {
        return "High level of academic achievement needed to reach target GPA.";
    }
    if (rawGpa <= maxGpa) {
        return "Excellent academic performance is required to achieve this target.";
    }
    return "Required GPA " + rawGpa.toFixed(2) + " exceeds maximum GPA. Aim for highest grades possible to maximise final CGPA.";
}

export function getTargetStatus(gpaGap, requiredGpa, maxGpa) {
    if (gpaGap <= 0) return "On Track";
    if (requiredGpa > maxGpa) return "Impossible";
    if (gpaGap <= 0.10) return "Achievable";
    if (gpaGap <= 0.25) return "Challenging";
    if (gpaGap <= 0.40) return "Very Challenging";
    return "Unlikely";
}

export const defaultSems = [
    { id: 5, credits: 15 },
    { id: 6, credits: 15 },
    { id: 7, credits: 15 },
    { id: 8, credits: 15 },
];