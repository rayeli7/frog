import { getFirestore, doc, setDoc } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

// This is an async task function (replace it with your actual functions)
const sampleAsyncFunction = async (name: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(`${name} completed`);
      } else {
        reject(`${name} failed`);
      }
    }, 1000);
  });
};

// Function to handle a list of async tasks
const handleAsyncTasks = async (
  tasks: Array<() => Promise<any>>,
  userId: string,
) => {
  const taskResults: string[] = [];
  const errors: string[] = [];

  try {
    // Process each task individually in sequence (or parallel if you use Promise.all)
    for (const task of tasks) {
      try {
        const result = await task(); // Await individual task execution
        taskResults.push(result);
      } catch (error) {
        errors.push(String(error));
      }
    }

    // If all tasks complete successfully, update Firebase with success logs
    const userRef = doc(db, "users", userId);
    const updateData = {
      success: taskResults,
      errors: errors.length > 0 ? errors : null,
      updatedAt: new Date().toISOString(),
    };

    // Save the results to Firebase
    await setDoc(userRef, updateData, { merge: true });

    if (errors.length > 0) {
      console.log("Some tasks failed:", errors);
    } else {
      console.log("All tasks completed successfully.");
    }
  } catch (globalError) {
    console.error("Error handling tasks:", globalError);
  }
};

// Example usage
const tasks = [
  () => sampleAsyncFunction("Task 1"),
  () => sampleAsyncFunction("Task 2"),
  () => sampleAsyncFunction("Task 3"),
  () => sampleAsyncFunction("Task 4"),
];

const userId = "some-user-id";

// Run the task handler
handleAsyncTasks(tasks, userId);
