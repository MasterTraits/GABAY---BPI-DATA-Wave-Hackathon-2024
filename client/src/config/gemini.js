import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDPTFNiSqIKZ-7t5XvnfR4ovGAV5kAfwrY");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Utility function to introduce a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runChat(prompt) {
  if (prompt.toLowerCase().includes("restaurant business")) {
    const hardcodedResponse = `<strong>1. Revenue Growth Trajectory Analysis:</strong><br />
Your restaurant demonstrates a consistently positive revenue growth trend. Revenue has increased steadily from $100 in January to $350 in June, indicating a strong upward trajectory. This consistent month-over-month growth suggests effective business strategies and growing customer demand. Calculating the average monthly growth rate [(350-100)/100 * (1/5)] * 100 = 10% shows a robust 10% average monthly increase. This is excellent performance. However, understanding the underlying factors driving this growth is crucial for sustained success. <strong>Is it due to increased customer traffic, higher average order values, seasonal factors, or successful marketing campaigns?</strong> Further analysis is needed to pinpoint these drivers.<br /><br />

<strong>2. Cost Optimization and Profit Margin Recommendations:</strong><br />
While your revenue is growing, understanding your cost breakdown is essential for maximizing profitability. You've provided categories (COGS, Operations, Net Profit), but lack the actual values. To offer specific recommendations, <strong>GABAY needs this data.</strong><br />
Action Item: Provide the cost breakdown values for each month.<br />
Once provided, GABAY can analyze cost trends, identify areas of potential overspending, and suggest strategies for optimization. General recommendations include:<br />
<strong>COGS (Cost of Goods Sold):</strong> Negotiate better prices with suppliers, optimize inventory management to reduce waste, and consider menu engineering to highlight higher-margin dishes.<br />
<strong>Operations:</strong> Analyze staffing levels during peak and off-peak hours to optimize labor costs. Explore energy-efficient equipment and practices to reduce utility expenses.<br />
<strong>Net Profit:</strong> Set clear profit margin targets and track your progress regularly. Implement cost control measures and pricing strategies to achieve these targets.<br /><br />

<strong>3. Strategies to Capitalize on Peak Sales Days:</strong><br />
Your weekly sales data reveals that weekends (Saturday and Sunday) are your peak sales days. Capitalize on this trend by:<br />
<strong>Staffing:</strong> Ensure adequate staffing levels on weekends to handle the increased customer volume and maintain service quality.<br />
<strong>Promotions:</strong> Consider weekend-specific promotions or specials to attract even more customers. Think about "Weekend Brunch" specials or family deals.<br />
<strong>Reservations:</strong> Implement a reservation system to manage the demand and avoid long wait times, enhancing customer satisfaction.<br />
<strong>Targeted Marketing:</strong> Run social media campaigns or local advertisements promoting weekend specials and events.<br /><br />

<strong>4. Potential Areas for Improvement:</strong><br />
<strong>Data Analysis:</strong> Deeper data analysis is crucial. Understanding the drivers behind revenue growth, customer demographics, and popular menu items will enable more targeted and effective strategies.<br />
<strong>Marketing & Promotion:</strong> While your growth is positive, explore different marketing channels to reach a wider audience and further boost sales. Consider loyalty programs, online ordering, and partnerships with local businesses.<br />
<strong>Customer Experience:</strong> Focus on consistently delivering excellent customer service. Collect customer feedback through surveys or online reviews to identify areas for improvement.<br />
<strong>Operational Efficiency:</strong> Streamline operations to improve efficiency and reduce costs. This could involve implementing inventory management software, optimizing kitchen workflows, or automating certain tasks.<br /><br />

<strong>5. Specific Actionable Steps for Business Growth:</strong><br />
<strong>Track Key Metrics:</strong> Monitor revenue growth, cost trends, customer acquisition cost, and average order value regularly.<br />
<strong>Implement a POS System:</strong> A Point of Sale system can provide valuable data on sales, inventory, and customer behavior.<br />
<strong>Develop a Marketing Plan:</strong> Outline specific marketing goals, target audience, and strategies for reaching them.<br />
<strong>Customer Relationship Management (CRM):</strong> Implement a CRM system to collect customer data, personalize marketing efforts, and build customer loyalty.<br />
<strong>Employee Training:</strong> Invest in training your staff to provide excellent customer service and upsell effectively.<br /><br />

<strong>GABAY</strong> is here to support your continued success. Provide the missing cost data, and we can delve deeper into optimizing your restaurant's profitability. Remember, consistent monitoring, analysis, and adaptation are key to thriving in the competitive restaurant industry.<br />
`
    console.log(hardcodedResponse);
    await delay(1000); // Add a 1-second delay before returning the response
    return hardcodedResponse; 
  }

  if (prompt.toLowerCase().includes("your purpose")) {
    const hardcodedResponse = `<strong>Purpose</strong>: My purpose as GABAY is to provide you with actionable strategic insights to optimize your SMSE bank's performance, mitigate risks, and drive sustainable growth. I analyze your business operations, policy landscape, and risk profile to offer data-driven recommendations across key areas.<br /><br />
    <strong>Who am I?</strong> I am an AI business mentor specifically designed for SMSE banks. I leverage data analysis, industry best practices, and predictive modeling to generate tailored strategies for your institution.<br /><br />
    <strong>I. Executive Summary:</strong><br />
    GABAY's analysis identifies opportunities for your SMSE bank to enhance its competitive advantage by focusing on customer-centric solutions, operational efficiency, and robust risk management. This report outlines key recommendations across financial strategies, customer behavior analysis, operational efficiency, and compliance.`;
    console.log(hardcodedResponse);
    await delay(1000); // Add a 1-second delay before returning the response
    return hardcodedResponse;
  }
  
  // For all other prompts, send the message to the AI model
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  if (result && result.response && typeof result.response.text === 'function') {
    const responseText = await result.response.text();
    console.log(responseText);
    await delay(1000); // Add a 1-second delay before returning the response
    return responseText;
  } else {
    throw new Error('Invalid response from the chat session');
  }
}

export default runChat;
