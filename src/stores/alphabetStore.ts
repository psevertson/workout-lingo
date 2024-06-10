import { defineStore } from 'pinia';

export const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] as const;

export const typeOptions = [
  { label: 'Bicep curls', value: 'bicep_curls', type: 'reps' },
  { label: 'Burpees', value: 'burpees', type: 'reps' },
  { label: 'Calf Raises', value: 'calf_raises', type: 'reps' },
  { label: 'Crunches - Regular', value: 'crunches_regular', type: 'reps' },
  { label: 'Crunches - Bicycle', value: 'crunches_bicycle', type: 'reps' },
  { label: 'Crunches - Reverse', value: 'crunches_reverse', type: 'reps' },
  { label: 'Flutter Kicks (Reps)', value: 'flutter_kicks_reps', type: 'reps' },
  { label: 'Flutter Kicks (Seconds)', value: 'flutter_kicks_seconds', type: 'seconds' },
  { label: 'Hammer Curls', value: 'hammer_curls', type: 'reps' },
  { label: 'Heel Touches', value: 'heel_touches', type: 'reps' },
  { label: 'High Knees', value: 'high_knees', type: 'seconds' },
  { label: 'Hip Raises', value: 'hip_raises', type: 'reps' },
  { label: 'Jumping Jacks (Reps)', value: 'jumping_jacks_reps', type: 'reps' },
  { label: 'Jumping Jacks (Seconds)', value: 'jumping_jacks_seconds', type: 'seconds' },
  { label: 'Jump Rope', value: 'jump_rope', type: 'seconds' },
  { label: 'Lateral Raises', value: 'lateral_raises', type: 'reps' },
  { label: 'Lunges - Backward', value: 'lunges_backward', type: 'reps' },
  { label: 'Lunges - Forward', value: 'lunges_forward', type: 'reps' },
  { label: 'Lunges - Lateral', value: 'lunges_lateral', type: 'reps' },
  { label: 'Lunges - Side', value: 'lunges_side', type: 'reps' },
  { label: 'Mountain Climbers (Reps)', value: 'mountain_climbers_reps', type: 'reps' },
  { label: 'Mountain Climbers (Seconds)', value: 'mountain_climbers_seconds', type: 'seconds' },
  { label: 'Plank - Forearm', value: 'plank_forearm', type: 'seconds' },
  { label: 'Plank - Side', value: 'plank_side', type: 'seconds' },
  { label: 'Push Ups - Decline', value: 'pushups_decline', type: 'reps' },
  { label: 'Push Ups - Incline', value: 'pushups_incline', type: 'reps' },
  { label: 'Push Ups - Knee', value: 'pushups_knee', type: 'reps' },
  { label: 'Push Ups - Wall', value: 'pushups_wall', type: 'reps' },
  { label: 'Run In Place', value: 'run_in_place', type: 'seconds' },
  { label: 'Russian Twists', value: 'russian_twists', type: 'reps' },
  { label: 'Shoulder Press', value: 'shoulder_press', type: 'reps' },
  { label: 'Squats - Jumping', value: 'squats_jumping', type: 'reps' },
  { label: 'Squats - Lateral', value: 'squats_lateral', type: 'reps' },
  { label: 'Squats - Sumo', value: 'squats_sumo', type: 'reps' },
  { label: 'Step Ups', value: 'step_ups', type: 'reps' },
  { label: 'Tricep Dips', value: 'tricep_dips', type: 'reps' },
  { label: 'Tricep Extensions', value: 'tricep_extensions', type: 'reps' },
  { label: 'V-ups', value: 'v_ups', type: 'reps' },
  { label: 'Wall Sit', value: 'wall_sit', type: 'reps' },
  { label: 'Custom (Reps)', value: 'custom_reps', type: 'reps' },
  { label: 'Custom (Seconds)', value: 'custom_seconds', type: 'seconds' },
] as const;

export const unitOptions = [
  { label: 'Seconds', value: 'seconds' },
  { label: 'Reps', value: 'reps' },
] as const;

export type Workout = {
  label: string;
  type: (typeof typeOptions)[number]['value'] | '';
  unit: (typeof unitOptions)[number]['value'] | '';
  quantity: number;
};

export const useAlphabetStore = defineStore('alphabet', {
  state: () => ({
    workouts: Array(26)
      .fill(null)
      .map(() => ({
        label: '',
        type: '',
        unit: '',
        quantity: 0,
      })) as Workout[],
  }),
  persist: true,
});
