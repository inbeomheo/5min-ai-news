// Supabase 방문자 추적 시스템 (실시간 업데이트)
// 설정: SUPABASE_SETUP.md 참고

const VisitorTracker = {
  // ✅ Supabase 정보 (사용자 제공 신규 정보 적용)
  SUPABASE_URL: 'https://uscwcqhwqnywdnuliymb.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzY3djcWh3cW55d2RudWxpeW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMDM5ODMsImV4cCI6MjA1Njc3OTk4M30.MZR9-Oy-XXFb2jdF0Z5U5N0OzFrPMikqUM45zKDLgjw',
  
  supabaseClient: null,
  realtimeChannel: null,
  
  // 방문자 고유 ID 생성 또는 가져오기
  getVisitorId() {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
  },
  
  // 방문 기록
  async trackVisit() {
    if (this.SUPABASE_URL === 'YOUR_SUPABASE_URL') {
      return;
    }
    
    try {
      const response = await fetch(`${this.SUPABASE_URL}/rest/v1/page_visits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${this.SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          page_url: window.location.pathname,
          visitor_id: this.getVisitorId(),
          user_agent: navigator.userAgent,
          referrer: document.referrer || 'direct'
        })
      });
    } catch (error) {
      console.error('방문 기록 실패:', error);
    }
  },
  
  // 통계 업데이트 (DOM 요소에 표시) - visitor_id 기준 순방문자 수
  async updateStats() {
    try {
        // 전체 고유 방문자 수 (visitor_id 기준 DISTINCT)
        const totalRes = await fetch(
            `${this.SUPABASE_URL}/rest/v1/rpc/count_unique_visitors`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${this.SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({})
            }
        );
        let totalCount = 0;
        if (totalRes.ok) {
            totalCount = await totalRes.json();
        }

        // 오늘 고유 방문자 수 (visitor_id 기준 DISTINCT) - 한국 시간 기준
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`; // 로컬 시간 기준 YYYY-MM-DD
        
        const todayRes = await fetch(
            `${this.SUPABASE_URL}/rest/v1/rpc/count_today_unique_visitors`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${this.SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({ target_date: todayStr })
            }
        );
        let todayCount = 0;
        if (todayRes.ok) {
            todayCount = await todayRes.json();
        }

        // DOM 업데이트
        const totalEl = document.getElementById('total-visits');
        const todayEl = document.getElementById('today-visits');
        
        if (totalEl) totalEl.textContent = totalCount.toLocaleString();
        if (todayEl) todayEl.textContent = todayCount.toLocaleString();

    } catch (error) {
        console.error('통계 업데이트 실패:', error);
    }
  },
  
  // Realtime 구독 설정
  setupRealtimeSubscription() {
    if (typeof window.supabase === 'undefined' || !window.supabase.createClient) {
      setInterval(() => this.updateStats(), 10000);
      return;
    }
    
    if (!this.supabaseClient) {
      this.supabaseClient = window.supabase.createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY);
    }
    
    this.realtimeChannel = this.supabaseClient
      .channel('page_visits_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'page_visits' },
        () => this.updateStats()
      )
      .subscribe();
  },
  
  // 초기화
  async init() {
    await this.trackVisit();
    await this.updateStats();
    this.setupRealtimeSubscription();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => VisitorTracker.init());
} else {
  VisitorTracker.init();
}
