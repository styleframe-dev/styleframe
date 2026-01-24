export const defaultEasingValues = {
	// Basic CSS Keywords
	linear: "linear",
	ease: "ease",
	"ease-in": "ease-in",
	"ease-out": "ease-out",
	"ease-in-out": "ease-in-out",

	// Sine
	"ease-in-sine": "cubic-bezier(0.47, 0, 0.745, 0.715)",
	"ease-out-sine": "cubic-bezier(0.39, 0.575, 0.565, 1)",
	"ease-in-out-sine": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",

	// Quad
	"ease-in-quad": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
	"ease-out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
	"ease-in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",

	// Cubic
	"ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
	"ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
	"ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",

	// Quart
	"ease-in-quart": "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
	"ease-out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
	"ease-in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",

	// Quint
	"ease-in-quint": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
	"ease-out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
	"ease-in-out-quint": "cubic-bezier(0.86, 0, 0.07, 1)",

	// Expo
	"ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
	"ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
	"ease-in-out-expo": "cubic-bezier(1, 0, 0, 1)",

	// Circ
	"ease-in-circ": "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
	"ease-out-circ": "cubic-bezier(0.075, 0.82, 0.165, 1)",
	"ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",

	// Back (with overshoot)
	"ease-in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
	"ease-out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
	"ease-in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",

	// Spring (linear() function)
	spring:
		"linear(0, 0.0018, 0.0069 1.15%, 0.026 2.3%, 0.0637, 0.1135 5.18%, 0.2229 7.78%, 0.5977 15.84%, 0.7014, 0.7904, 0.8641, 0.9228, 0.9676 28.8%, 1.0032 31.68%, 1.0225, 1.0352 36.29%, 1.0431 38.88%, 1.046 42.05%, 1.0448 44.35%, 1.0407 47.23%, 1.0118 61.63%, 1.0025 69.41%, 0.9981 80.35%, 0.9992 99.94%)",

	// Bounce (linear() function)
	bounce:
		"linear(0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141 13.6%, 0.25, 0.391, 0.563, 0.765, 1, 0.891 40.9%, 0.848, 0.813, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785, 0.813, 0.848, 0.891 68.2%, 1 72.7%, 0.973, 0.953, 0.941, 0.938, 0.941, 0.953, 0.973, 1, 0.988, 0.984, 0.988, 1)",
} as const;
