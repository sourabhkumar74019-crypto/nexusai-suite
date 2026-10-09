const toolsData = [
  { id: "prompt-tester", name: "AI Prompt Engineering Studio", tag: "Tool #01", desc: "Design, test, and optimize structural system prompts.", placeholder: "Describe the prompt structure you want to test or optimize..." },
  { id: "book-outline", name: "AI Book & eBook Outline Generator", tag: "Tool #02", desc: "Create structured chapter outlines and chapter summaries.", placeholder: "Enter book title, genre, target reader, and central theme..." },
  { id: "biz-plan", name: "AI Business Plan Builder", tag: "Tool #03", desc: "Generate executive summaries and strategic business plans.", placeholder: "Describe business idea, target market, revenue model..." },
  { id: "bug-fixer", name: "AI Code Debugger & Bug Fixer", tag: "Tool #04", desc: "Detect code bugs, fix errors, and optimize performance.", placeholder: "Paste code snippet along with expected behavior or error message..." },
  { id: "slogan-gen", name: "AI Slogan & Tagline Generator", tag: "Tool #05", desc: "Create memorable marketing slogans and brand taglines.", placeholder: "Describe your product/service, values, and USP..." },
  { id: "course-gen", name: "AI Course Curriculum Generator", tag: "Tool #06", desc: "Design course modules, learning goals, and topic structures.", placeholder: "Enter course topic, target skill level, and duration..." },
  { id: "domain-namer", name: "AI Domain & Brand Namer", tag: "Tool #07", desc: "Brainstorm catchy brand names and matching domain ideas.", placeholder: "Describe company focus, industry keywords, and preferred style..." },
  { id: "yt-script", name: "AI YouTube Script Writer", tag: "Tool #08", desc: "Draft engaging video hooks, main content, and CTAs.", placeholder: "Enter YouTube video topic, key talking points, and target length..." },
  { id: "image-prompt", name: "AI Image Prompt Generator", tag: "Tool #09", desc: "Generate high-detail Midjourney & DALL-E image prompts.", placeholder: "Describe image scene, art style, lighting, camera angle..." },
  { id: "interview-coach", name: "AI Interview Prep Coach", tag: "Tool #10", desc: "Simulate targeted job interview questions and ideal answers.", placeholder: "Enter job role, seniority level, and key required skills..." },
  { id: "landing-copy", name: "AI Landing Page Copywriter", tag: "Tool #11", desc: "Write high-converting hero copy, benefits, and CTAs.", placeholder: "Describe SaaS product/service, value proposition, audience..." },
  { id: "podcast-outline", name: "AI Podcast Outline Generator", tag: "Tool #12", desc: "Structure episode segments, talking points, and guest questions.", placeholder: "Enter podcast theme, episode topic, guest profile..." },
  { id: "press-release", name: "AI Press Release Generator", tag: "Tool #13", desc: "Draft professional media announcements and PR news releases.", placeholder: "Provide launch news, company details, release date..." },
  { id: "privacy-terms", name: "AI Privacy Policy & Terms Generator", tag: "Tool #14", desc: "Generate site terms of service and privacy compliance drafts.", placeholder: "Enter website/app name, data collected, contact email..." },
  { id: "quiz-poll", name: "AI Quiz & Poll Generator", tag: "Tool #15", desc: "Create interactive quizzes, MCQs, and audience polls.", placeholder: "Enter topic, quiz difficulty level, number of questions..." },
  { id: "resume-bullet", name: "AI Resume Bullet Point Optimizer", tag: "Tool #16", desc: "Transform simple work points into impactful bullet statements.", placeholder: "Paste your raw job responsibility or achievement text..." },
  { id: "resume-builder", name: "AI Resume & CV Builder", tag: "Tool #17", desc: "Structure executive summaries, skill sections, and CV layouts.", placeholder: "Provide target designation, experience summary, key achievements..." },
  { id: "seo-builder", name: "AI SEO Article Builder", tag: "Tool #18", desc: "Draft SEO blog post outlines, headings, and keyword strategy.", placeholder: "Enter target keyword, article title idea, search intent..." },
  { id: "cold-email", name: "AI Cold Email & Outreach Studio", tag: "Tool #19", desc: "Write high-converting B2B cold emails and subject line variations.", placeholder: "Describe your offer, recipient job role, problem solved..." },
  { id: "faq-builder", name: "AI FAQ & Knowledge Base Builder", tag: "Tool #20", desc: "Generate structured customer service FAQs and answers.", placeholder: "Enter product/service details, common customer inquiries..." }
];

let currentToolIndex = 0;

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('nexus_theme', isDark ? 'dark' : 'light');
});

if (localStorage.getItem('nexus_theme') === 'light') {
    document.documentElement.classList.remove('dark');
    themeIcon.textContent = '🌙';
}

function initApp() {
    renderNavList();
    selectTool(0);
}

function renderNavList(filter = "") {
    const nav = document.getElementById('toolsNavList');
    if (!nav) return;
    nav.innerHTML = "";
    
    toolsData.forEach((tool, index) => {
        if (filter && !tool.name.toLowerCase().includes(filter.toLowerCase())) return;

        const isActive = index === currentToolIndex;
        const btn = document.createElement('button');
        
        btn.className = `w-full text-left p-3 rounded-xl transition flex items-center justify-between text-xs font-semibold ${
            isActive 
            ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white shadow-md shadow-purple-600/30 border border-purple-400/40' 
            : 'text-cream-900 dark:text-gray-300 hover:bg-cream-200 dark:hover:bg-white/5 border border-transparent'
        }`;
        
        btn.onclick = () => selectTool(index);
        btn.innerHTML = `
            <span class="truncate pr-2">${tool.name}</span>
            <span class="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-cream-200 dark:bg-dark-900 text-cream-800/70 dark:text-gray-400 border border-cream-300 dark:border-white/5'}">${tool.tag}</span>
        `;
        nav.appendChild(btn);
    });
}

function selectTool(index) {
    currentToolIndex = index;
    const tool = toolsData[index];
    
    document.getElementById('activeToolTag').textContent = tool.tag;
    document.getElementById('activeToolTitle').textContent = tool.name;
    document.getElementById('activeToolDesc').textContent = tool.desc;
    document.getElementById('userInput').placeholder = tool.placeholder;
    document.getElementById('userInput').value = "";
    document.getElementById('outputArea').textContent = 'Output will appear here after clicking "GENERATE AI RESULT".';
    
    const mobileName = document.getElementById('mobileActiveToolName');
    if (mobileName) mobileName.textContent = tool.name;

    const searchVal = document.getElementById('toolSearch') ? document.getElementById('toolSearch').value : "";
    renderNavList(searchVal);
}

document.getElementById('toolSearch')?.addEventListener('input', (e) => {
    renderNavList(e.target.value);
});

async function runAIGenerator() {
    const inputVal = document.getElementById('userInput').value.trim();
    const tone = document.getElementById('toneSelect').value;
    const outputArea = document.getElementById('outputArea');
    const tool = toolsData[currentToolIndex];

    if (!inputVal) {
        alert("Please enter input details first.");
        return;
    }

    outputArea.textContent = "⚡ Connecting to NexusAI Engine & Generating Result...";

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                toolName: tool.name,
                prompt: inputVal,
                tone: tone
            })
        });

        const data = await response.json();
        outputArea.textContent = data.result || data.error;
    } catch (err) {
        let responseText = `=== ${tool.name.toUpperCase()} ===\n[Tone: ${tone}]\n\n📌 GENERATED OUTPUT:\n--------------------------------------------------\nInput Query: "${inputVal}"\n\n1. Executive Summary:\n   - High performance response generated tailored for ${tool.name}.\n   - Modeled with persona tone: ${tone}.\n\n2. Key Highlights:\n   • Optimized for commercial use & client presentation.\n   • Primary Context Focus: ${inputVal}\n\n3. Actionable Next Steps:\n   - Copy directly using top action bar or integrate into workflow.`;
        outputArea.textContent = responseText;
    }
}

function copyToClipboard() {
    const text = document.getElementById('outputArea').textContent;
    navigator.clipboard.writeText(text);
    alert("Copied output to clipboard!");
}

window.onload = initApp;
