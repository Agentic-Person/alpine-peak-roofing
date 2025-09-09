#!/usr/bin/env node

/**
 * Performance Audit Script for Alpine Peak Roofing
 * Tests Core Web Vitals and PageSpeed score to verify 95+ target
 */

const { default: lighthouse } = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;

const SERVER_URL = 'http://localhost:3005';
const OUTPUT_PATH = './performance-report.json';

async function runLighthouseAudit() {
  console.log('🚀 Starting Performance Audit for Alpine Peak Roofing...\n');
  
  // Launch Chrome instance
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
  });

  try {
    // Configure Lighthouse options
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance'],
      port: chrome.port,
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 10240,
        uploadThroughputKbps: 750,
      }
    };

    // Run Lighthouse audit
    console.log('Running Lighthouse audit...');
    const runnerResult = await lighthouse(SERVER_URL, options);

    // Extract Core Web Vitals
    const lhr = runnerResult.lhr;
    const performanceScore = Math.round(lhr.categories.performance.score * 100);
    
    const vitals = {
      performanceScore,
      lcp: lhr.audits['largest-contentful-paint'].numericValue,
      fid: lhr.audits['max-potential-fid']?.numericValue || 0,
      cls: lhr.audits['cumulative-layout-shift'].numericValue,
      fcp: lhr.audits['first-contentful-paint'].numericValue,
      ttfb: lhr.audits['server-response-time']?.numericValue || 0,
      totalBlockingTime: lhr.audits['total-blocking-time'].numericValue,
      speedIndex: lhr.audits['speed-index'].numericValue
    };

    // Display results
    console.log('\n🎯 Alpine Peak Roofing Performance Results:\n');
    console.log(`📊 Overall Performance Score: ${performanceScore}/100`);
    console.log(`🎯 Target Achievement: ${performanceScore >= 95 ? '✅ ACHIEVED' : '❌ NEEDS IMPROVEMENT'}`);
    console.log('\n📈 Core Web Vitals:');
    console.log(`  LCP (Largest Contentful Paint): ${Math.round(vitals.lcp)}ms ${vitals.lcp <= 2500 ? '✅' : '❌'}`);
    console.log(`  FID/INP (Interaction): ${Math.round(vitals.fid)}ms ${vitals.fid <= 100 ? '✅' : '❌'}`);
    console.log(`  CLS (Cumulative Layout Shift): ${vitals.cls.toFixed(3)} ${vitals.cls <= 0.1 ? '✅' : '❌'}`);
    console.log(`  FCP (First Contentful Paint): ${Math.round(vitals.fcp)}ms ${vitals.fcp <= 1800 ? '✅' : '❌'}`);
    console.log(`  TTFB (Time to First Byte): ${Math.round(vitals.ttfb)}ms ${vitals.ttfb <= 600 ? '✅' : '❌'}`);
    
    console.log('\n📋 Additional Metrics:');
    console.log(`  Total Blocking Time: ${Math.round(vitals.totalBlockingTime)}ms`);
    console.log(`  Speed Index: ${Math.round(vitals.speedIndex)}`);

    // Recommendations
    console.log('\n💡 Optimization Opportunities:');
    const opportunities = lhr.audits;
    
    Object.keys(opportunities).forEach(key => {
      const audit = opportunities[key];
      if (audit.details?.type === 'opportunity' && audit.numericValue > 100) {
        console.log(`  - ${audit.title}: Save ~${Math.round(audit.numericValue)}ms`);
      }
    });

    // Save detailed report
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(lhr, null, 2));
    console.log(`\n📄 Detailed report saved to: ${OUTPUT_PATH}`);
    
    // Grade assignment
    const grade = performanceScore >= 95 ? 'A+' : 
                  performanceScore >= 90 ? 'A' :
                  performanceScore >= 80 ? 'B' :
                  performanceScore >= 70 ? 'C' : 'D';
    
    console.log(`\n🏆 Final Grade: ${grade}`);
    console.log(`🎯 Alpine Peak Roofing LLM-SEO Optimization: ${performanceScore >= 95 ? 'MISSION ACCOMPLISHED!' : 'CONTINUE OPTIMIZATION'}`);
    
    return {
      success: performanceScore >= 95,
      score: performanceScore,
      vitals,
      grade
    };

  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    return { success: false, error: error.message };
  } finally {
    await chrome.kill();
  }
}

// Run audit if called directly
if (require.main === module) {
  runLighthouseAudit()
    .then(result => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = runLighthouseAudit;