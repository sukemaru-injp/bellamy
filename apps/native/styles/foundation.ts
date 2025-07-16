export const colors = {
	main: '#f5b08b',
	secondary: '#e89d72', 
	background: '#fef7e4',
	
	// Text colors
	text: {
		primary: '#333333',
		secondary: '#666666',
		muted: '#999999',
		inverse: '#ffffff'
	},
	
	// Food category colors (harmonious with main theme)
	foodCategory: {
		main: '#d4844a',      // Darker orange for main dishes
		side: '#b5d1a8',      // Light green for sides  
		soup: '#a8c5d1',      // Light blue for soups
		rice: '#f0d4a8',      // Light tan for rice
		dessert: '#f2c5a8',   // Peachy for desserts
		drink: '#c5a8d1',     // Light purple for drinks
		other: '#b5b5b5'      // Gray for other
	},
	
	// Recommendation reason colors (based on main theme)
	recommendation: {
		sameIngredients: '#d4844a',    // Brown-orange
		differentIngredients: '#b5d1a8', // Green
		flavorVariation: '#f0d4a8',    // Light tan
		nutritionalBalance: '#e89d72'   // Secondary color
	},
	
	// UI states
	success: '#a8d1a8',
	warning: '#f0d4a8', 
	error: '#d1a8a8',
	info: '#a8c5d1'
} as const;
