// State
let appState = 'LANDING'; // LANDING, SIMULATION
let capturedData = { phone: '', otp: '' };
let countdown = 25;

// DOM Elements
const landingPage = document.getElementById('landing-page');
const simulationPage = document.getElementById('simulation-page');
const quotaCount = document.getElementById('quota-count');
const phoneInput = document.getElementById('phone-input');
const otpContainer = document.getElementById('otp-container');
const otpInput = document.getElementById('otp-input');
const actionBtn = document.getElementById('action-btn');
const btnText = document.getElementById('btn-text');
const winnersList = document.getElementById('winners-list');
const consoleLogs = document.getElementById('console-logs');
const capturedPhoneDisplay = document.getElementById('captured-phone');
const capturedOtpDisplay = document.getElementById('captured-otp');
const aiContent = document.getElementById('ai-content');
const aiLoading = document.getElementById('ai-loading');
const smsNotification = document.getElementById('sms-notification');

// --- Landing Page Logic ---

// 1. Countdown Timer
setInterval(() => {
    if (countdown > 5) {
        countdown--;
        quotaCount.innerText = countdown;
    }
}, 2000);

// 2. Winners Ticker
const winners = [
    { user: '用户 139****9283', prize: '使用 DeepSeek 生成了 2000 行代码' },
    { user: '用户 186****1122', prize: '使用 GPT-4o 润色了毕业论文' },
    { user: '用户 150****8833', prize: '使用 Claude 3.5 完成了商业计划书' },
    { user: '用户 133****4455', prize: '体验了 AI 绘画功能' },
    { user: '用户 199****1029', prize: '生成了 Python 自动化脚本' },
    { user: '用户 138****0011', prize: '完成了多语言翻译任务' },
];

function renderWinners() {
    winnersList.innerHTML = winners.map(w => `
        <div class="flex items-center justify-between text-xs text-blue-200/70 border-b border-white/5 pb-2">
            <span>${w.user}</span>
            <span class="text-cyan-400">${w.prize}</span>
        </div>
    `).join('');
}
renderWinners();

// 3. Form Handling
let isOtpStep = false;

// Notification Click Handler
smsNotification.addEventListener('click', () => {
    otpInput.value = '213784';
    // Hide notification
    smsNotification.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => smsNotification.classList.add('hidden'), 500);
    
    // Optional: Flash the input to show it was filled
    otpInput.classList.add('bg-cyan-900/50', 'border-cyan-500');
    setTimeout(() => otpInput.classList.remove('bg-cyan-900/50', 'border-cyan-500'), 300);
});

actionBtn.addEventListener('click', () => {
    const phone = phoneInput.value;
    
    if (!isOtpStep) {
        // Step 1: Send OTP
        if (phone.length < 11) {
            alert("请输入正确的11位手机号码");
            return;
        }

        // Simulate loading
        const originalText = btnText.innerText;
        btnText.innerText = "正在连接安全网关...";
        actionBtn.disabled = true;
        actionBtn.classList.add('opacity-75', 'cursor-not-allowed');

        setTimeout(() => {
            actionBtn.disabled = false;
            actionBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            btnText.innerText = "立即体验";
            
            otpContainer.classList.remove('hidden');
            isOtpStep = true;
            alert("恭喜！您已获得【NextGen AI】内测资格，验证码已发送至您的手机。");
            
            // Trigger Fake SMS Notification after 2 seconds (from click start approx, or 800ms from now)
            // User asked for "获取验证码2秒后", let's make it 2s from now (when the alert shows/input appears)
            setTimeout(() => {
                smsNotification.classList.remove('hidden');
                // Small delay to allow display:block to apply before transition
                requestAnimationFrame(() => {
                    smsNotification.classList.remove('opacity-0', 'translate-y-4');
                });
                
                // Auto hide after 5 seconds if not clicked
                setTimeout(() => {
                    if (!smsNotification.classList.contains('hidden')) {
                        smsNotification.classList.add('opacity-0', 'translate-y-4');
                        setTimeout(() => smsNotification.classList.add('hidden'), 500);
                    }
                }, 5000);
            }, 2000);

        }, 1200);

    } else {
        // Step 2: Submit OTP
        const otp = otpInput.value;
        if (!otp) {
            alert("请输入验证码");
            return;
        }

        capturedData = { phone, otp };
        startSimulation();
    }
});

// --- Simulation Page Logic ---

function startSimulation() {
    appState = 'SIMULATION';
    landingPage.classList.add('hidden');
    simulationPage.classList.remove('hidden');
    
    // Update captured data display
    capturedPhoneDisplay.innerText = capturedData.phone;
    capturedOtpDisplay.innerText = capturedData.otp;

    runAttackSequence();
}

function addLog(message, type = 'info') {
    const div = document.createElement('div');
    div.className = "mb-2 break-all";
    
    const timestamp = new Date().toLocaleTimeString('zh-CN');
    
    let colorClass = 'text-blue-300';
    let prefix = '> ';
    
    if (type === 'danger') {
        colorClass = 'text-red-500 font-bold';
        prefix = '>> ';
    } else if (type === 'success') {
        colorClass = 'text-green-400';
    } else if (type === 'warning') {
        colorClass = 'text-yellow-400';
    }

    div.innerHTML = `
        <span class="text-gray-500">[${timestamp}]</span>
        <span class="${colorClass}">${prefix}${message}</span>
    `;
    
    consoleLogs.appendChild(div);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
}

async function runAttackSequence() {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    addLog('初始化恶意攻击节点...', 'info');
    await delay(800);
    
    addLog(`检测到来自前端的输入流...`, 'info');
    await delay(800);

    addLog(`[捕获] 用户手机号: ${capturedData.phone}`, 'success');
    addLog('启动自动化脚本，目标：关联的社交/支付账号...', 'warning');
    await delay(1000);

    addLog('伪造设备指纹，尝试登录目标平台...', 'info');
    await delay(800);
    
    addLog('目标平台请求短信验证码...', 'info');
    await delay(500);
    
    addLog(`[捕获] 短信验证码: ${capturedData.otp}`, 'success');
    addLog(`正在将验证码 ${capturedData.otp} 转发至目标平台接口...`, 'danger');
    await delay(1200);
    
    addLog('平台响应: 200 OK. 登录成功。', 'danger');
    addLog('已获取用户 Session/Cookie。', 'danger');
    addLog('正在扫描关联银行卡信息...', 'danger');
    addLog('正在尝试发起小额转账...', 'danger');

    // Fetch AI Advice
    fetchSecurityAdvice();
}

async function fetchSecurityAdvice() {
    aiLoading.classList.remove('hidden');
    aiContent.innerHTML = '<p class="italic opacity-70">正在生成安全分析报告...</p>';

    // Mock Data (Fallback)
    const mockAdvice = {
        mechanism: "这是一种利用人性弱点（贪小便宜、好奇心）的典型社会工程学攻击。无论是“免费领会员”、“超低价商品”还是“破解版AI”，本质都是攻击者抛出的诱饵。当你为了这点“蝇头小利”在伪造的页面输入手机号和验证码时，攻击者的自动化脚本正在后台同步攻击你的高价值账户（如支付宝、微信、网银）。你以为你在薅羊毛，实际上你才是那只待宰的肥羊。验证码一旦泄露，你的资金和隐私将瞬间失守。",
        preventionTips: [
            "牢记“天上不会掉馅饼”，任何违背市场规律的“免费”或“巨额优惠”往往都是陷阱。",
            "**核对短信内容**：收到验证码时，必须看清是“注册/登录”还是“转账/支付”，以及短信来源是否与你当前操作的平台一致。",
            "**拒绝非官方渠道**：不要点击不明链接，不要在非官方APP或网站输入个人敏感信息。",
            "**开启多重防护**：为重要账户开启设备锁、指纹/面容识别或二次验证（2FA），不要仅依赖短信验证码。",
            "**止损意识**：一旦发现误操作，立即修改密码、冻结账户并联系官方客服，切勿抱有侥幸心理。"
        ]
    };

    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));

    // Render Advice
    aiLoading.classList.add('hidden');
    
    // Parse Markdown using marked.js
    // marked.parse might wrap content in <p>, so we handle styling in CSS or classes if needed
    const mechanismHtml = marked.parse(mockAdvice.mechanism);
    const tipsHtml = mockAdvice.preventionTips.map(tip => {
        // Use parseInline if available to avoid <p> tags in <li>, otherwise regular parse
        const content = typeof marked.parseInline === 'function' 
            ? marked.parseInline(tip) 
            : marked.parse(tip);
        return `<li>${content}</li>`;
    }).join('');

    aiContent.innerHTML = `
        <div class="mb-4">
            <h4 class="font-bold text-white mb-2">⚠️ 攻击原理揭秘</h4>
            <div class="leading-relaxed text-gray-300 text-sm space-y-2 [&>p]:mb-2">
                ${mechanismHtml}
            </div>
        </div>
        <div>
            <h4 class="font-bold text-white mb-2">🛡️ 如何防范？</h4>
            <ul class="list-disc list-inside space-y-2 text-gray-300 text-sm [&>li>p]:inline">
                ${tipsHtml}
            </ul>
        </div>
    `;
}
