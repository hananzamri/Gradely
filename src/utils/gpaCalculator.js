export function convertToPoint(grade) {

  // remove %
  const numericGrade =
    Number(String(grade).replace("%", ""));

  // letter grades
  if (grade === "A+") return 4.5;
  if (grade === "A") return 4.0;
  if (grade === "B+") return 3.5;
  if (grade === "B") return 3.0;
  if (grade === "C+") return 2.5;
  if (grade === "C") return 2.0;
  if (grade === "D+") return 1.5;
  if (grade === "D") return 1.0;
  if (grade === "F") return 0.0;

  // percentage conversion
  if (numericGrade >= 90) return 4.5;
  if (numericGrade >= 85) return 4.0;
  if (numericGrade >= 80) return 3.5;
  if (numericGrade >= 75) return 3.0;
  if (numericGrade >= 70) return 2.5;
  if (numericGrade >= 65) return 2.0;
  if (numericGrade >= 60) return 1.5;
  if (numericGrade >= 50) return 1.0;

  return 0.0;
}

export function calculateGPA(subjects) {

  let totalPoints = 0;
  let totalCredits = 0;

  subjects.forEach((subject) => {

    const point =
      convertToPoint(subject.grade);

    totalPoints += point * subject.credits;

    totalCredits += subject.credits;

  });

  return (
    totalPoints / totalCredits
  ).toFixed(2);
}