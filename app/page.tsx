'use client'

import { useState } from 'react'

interface Job {
  title: string
  company: string
  country: string
  visaSponsorship: 'yes' | 'no' | 'unknown'
  matchReason: string
  applyLink: string
  source: string
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const profile = {
    name: 'Marwen Slimen',
    experience: '1.5+ years',
    skills: [
      'Digital Marketing',
      'Content Creation',
      'Social Media Management',
      'Videography',
      'Video Editing',
      'Graphic Design',
      'WordPress Development',
      'SEO Basics'
    ],
    countries: ['UK', 'Netherlands', 'Belgium', 'Ireland', 'Italy'],
    excludeCountries: ['USA', 'Germany', 'France'],
    jobTypes: [
      'Marketing Assistant',
      'Digital Marketing Executive',
      'Content Creator',
      'Content Specialist',
      'Videographer',
      'Video Editor',
      'Social Media Manager',
      'WordPress Content Manager',
      'Creative Assistant'
    ]
  }

  const searchJobs = async () => {
    setLoading(true)
    setError('')
    setJobs([])

    try {
      const response = await fetch('/api/search-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch jobs')
      }

      setJobs(data.jobs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching for jobs')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🎯 Job Search Assistant</h1>
        <p>Finding your perfect marketing & creative role with visa sponsorship</p>
      </div>

      <div className="profile-section">
        <h2>Your Profile</h2>
        <div className="profile-grid">
          <div className="profile-item">
            <h3>Name</h3>
            <p>{profile.name}</p>
          </div>
          <div className="profile-item">
            <h3>Experience</h3>
            <p>{profile.experience}</p>
          </div>
          <div className="profile-item">
            <h3>Target Countries</h3>
            <p>{profile.countries.join(', ')}</p>
          </div>
          <div className="profile-item">
            <h3>Skills</h3>
            <div className="skills">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <div className="profile-item">
            <h3>Target Roles</h3>
            <p>{profile.jobTypes.join(' • ')}</p>
          </div>
        </div>
      </div>

      <div className="search-section">
        <div className="search-controls">
          <button
            className="search-btn"
            onClick={searchJobs}
            disabled={loading}
          >
            {loading ? 'Searching...' : '🔍 Search Jobs'}
          </button>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Searching job boards for matching opportunities...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="jobs-grid">
            {jobs.map((job, index) => (
              <div key={index} className="job-card">
                <div className="job-header">
                  <div>
                    <h3 className="job-title">{job.title}</h3>
                    <p className="company-name">{job.company}</p>
                  </div>
                </div>

                <div className="job-meta">
                  <span className="meta-tag">📍 {job.country}</span>
                  <span className={`meta-tag ${job.visaSponsorship === 'yes' ? 'visa-yes' : job.visaSponsorship === 'no' ? 'visa-no' : ''}`}>
                    {job.visaSponsorship === 'yes' ? '✅ Visa Sponsorship' :
                     job.visaSponsorship === 'no' ? '⚠️ No Visa Info' :
                     '❓ Visa Unknown'}
                  </span>
                  <span className="meta-tag">🌐 {job.source}</span>
                </div>

                <div className="match-reason">
                  <strong>Why you match:</strong>
                  {job.matchReason}
                </div>

                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-btn"
                >
                  Apply Now →
                </a>
              </div>
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && !error && (
          <div className="no-jobs">
            <p>Click the search button to find matching job opportunities</p>
          </div>
        )}
      </div>
    </div>
  )
}
