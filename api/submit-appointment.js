// Notion API integration for appointment submissions
// This serverless function works with both Netlify and Vercel

const NOTION_API_KEY = process.env.NOTION_TOKEN || process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function submitToNotion(appointmentData) {
    const notionUrl = `https://api.notion.com/v1/pages`;
    
    const notionPayload = {
        parent: {
            database_id: NOTION_DATABASE_ID
        },
        properties: {
            "Patient Name": {
                title: [
                    {
                        text: {
                            content: appointmentData.patientName || 'N/A'
                        }
                    }
                ]
            },
            "Phone Number": {
                phone_number: appointmentData.phoneNumber || null
            },
            "Department": {
                select: {
                    name: appointmentData.department || 'Not specified'
                }
            },
            "Hospital": {
                select: {
                    name: appointmentData.hospital || 'Not specified'
                }
            },
            "Appointment Date": {
                date: {
                    start: appointmentData.appointmentDate || null
                }
            },
            "Preferred Time": {
                rich_text: [
                    {
                        text: {
                            content: appointmentData.preferredTime || 'Not specified'
                        }
                    }
                ]
            },
            "Status": {
                select: {
                    name: "New"
                }
            },
            "Submitted At": {
                date: {
                    start: new Date().toISOString()
                }
            }
        }
    };

    const response = await fetch(notionUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${NOTION_API_KEY}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
        },
        body: JSON.stringify(notionPayload)
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Notion API error: ${error}`);
    }

    return response.json();
}

// For Netlify Functions
exports.handler = async (event, context) => {
    // Handle CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const appointmentData = JSON.parse(event.body);
        
        // Validate required fields
        if (!appointmentData.patientName || !appointmentData.phoneNumber) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Patient name and phone number are required' })
            };
        }

        const result = await submitToNotion(appointmentData);
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                message: 'Appointment submitted successfully',
                notionId: result.id 
            })
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message 
            })
        };
    }
};

// For Vercel Functions
module.exports = async (req, res) => {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const appointmentData = req.body;
        
        // Validate required fields
        if (!appointmentData.patientName || !appointmentData.phoneNumber) {
            return res.status(400).json({ error: 'Patient name and phone number are required' });
        }

        const result = await submitToNotion(appointmentData);
        
        return res.status(200).json({ 
            success: true, 
            message: 'Appointment submitted successfully',
            notionId: result.id 
        });
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
};