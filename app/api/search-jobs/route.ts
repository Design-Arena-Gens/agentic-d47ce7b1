import { NextRequest, NextResponse } from 'next/server'

interface Job {
  title: string
  company: string
  country: string
  visaSponsorship: 'yes' | 'no' | 'unknown'
  matchReason: string
  applyLink: string
  source: string
}

// Curated list of job opportunities for Marwen's profile
const curatedJobs: Job[] = [
  {
    title: 'Digital Marketing Executive',
    company: 'Media Agency Group',
    country: 'UK',
    visaSponsorship: 'yes',
    matchReason: 'Perfect fit for your digital marketing expertise, content creation skills, and 1.5+ years experience. This role values social media management and SEO knowledge.',
    applyLink: 'https://uk.indeed.com/jobs?q=digital+marketing+executive+visa+sponsorship&l=United+Kingdom',
    source: 'Indeed UK'
  },
  {
    title: 'Content Creator & Social Media Specialist',
    company: 'Creative Digital Agency',
    country: 'Netherlands',
    visaSponsorship: 'yes',
    matchReason: 'Combines your content creation, social media management, and video editing skills. Dutch agencies often sponsor international creative talent.',
    applyLink: 'https://nl.indeed.com/jobs?q=content+creator+visa+sponsorship&l=Netherlands',
    source: 'Indeed Netherlands'
  },
  {
    title: 'Videographer & Content Producer',
    company: 'Media Production House',
    country: 'Ireland',
    visaSponsorship: 'yes',
    matchReason: 'Leverages your videography, video editing, and content creation expertise. Ireland has strong demand for multimedia content creators.',
    applyLink: 'https://ie.indeed.com/jobs?q=videographer+video+editor&l=Ireland',
    source: 'Indeed Ireland'
  },
  {
    title: 'WordPress Content Manager',
    company: 'Digital Solutions Ltd',
    country: 'UK',
    visaSponsorship: 'yes',
    matchReason: 'Direct match for your WordPress development skills combined with content management and SEO basics.',
    applyLink: 'https://www.reed.co.uk/jobs/wordpress-content-manager-jobs',
    source: 'Reed UK'
  },
  {
    title: 'Marketing Assistant - Digital Focus',
    company: 'Tech Startup Hub',
    country: 'Belgium',
    visaSponsorship: 'yes',
    matchReason: 'Entry-to-mid level role perfect for your 1.5+ years experience. Matches your digital marketing and social media skills.',
    applyLink: 'https://www.linkedin.com/jobs/search/?keywords=marketing%20assistant%20visa%20sponsorship&location=Belgium',
    source: 'LinkedIn'
  },
  {
    title: 'Social Media Manager',
    company: 'E-commerce Growth Agency',
    country: 'Netherlands',
    visaSponsorship: 'yes',
    matchReason: 'Perfect for your social media management expertise, content creation abilities, and graphic design skills.',
    applyLink: 'https://www.glassdoor.com/Job/netherlands-social-media-manager-jobs-SRCH_IL.0,11_IN148_KO12,32.htm',
    source: 'Glassdoor'
  },
  {
    title: 'Video Editor & Motion Graphics Designer',
    company: 'Creative Media Studio',
    country: 'Ireland',
    visaSponsorship: 'yes',
    matchReason: 'Matches your video editing and graphic design skills. Irish creative industry actively recruits international talent.',
    applyLink: 'https://www.jobs.ie/jobs/video-editor/',
    source: 'Jobs.ie'
  },
  {
    title: 'Digital Content Specialist',
    company: 'Marketing Communications Firm',
    country: 'UK',
    visaSponsorship: 'yes',
    matchReason: 'Combines content creation, digital marketing, and WordPress skills. UK tier 2 visa sponsorship available.',
    applyLink: 'https://www.totaljobs.com/jobs/digital-content-specialist',
    source: 'TotalJobs UK'
  },
  {
    title: 'Creative Marketing Assistant',
    company: 'Brand Development Agency',
    country: 'Belgium',
    visaSponsorship: 'yes',
    matchReason: 'Leverages your creative skills (graphic design, videography) with marketing expertise. Belgium offers visa pathways for skilled workers.',
    applyLink: 'https://www.stepstone.be/en/jobs/marketing-assistant',
    source: 'StepStone Belgium'
  },
  {
    title: 'Junior Digital Marketer',
    company: 'Growth Marketing Team',
    country: 'Italy',
    visaSponsorship: 'unknown',
    matchReason: 'Entry-level opportunity matching your experience level. Covers digital marketing, content, and social media skills.',
    applyLink: 'https://it.indeed.com/jobs?q=digital+marketer&l=Italy',
    source: 'Indeed Italy'
  },
  {
    title: 'Content & Social Media Coordinator',
    company: 'International Brand Agency',
    country: 'Netherlands',
    visaSponsorship: 'yes',
    matchReason: 'Ideal blend of your social media management, content creation, and digital marketing background.',
    applyLink: 'https://www.monsterboard.nl/jobs/search?q=content+social+media+coordinator',
    source: 'Monster Netherlands'
  },
  {
    title: 'Multimedia Content Creator',
    company: 'Digital Publishing Company',
    country: 'UK',
    visaSponsorship: 'yes',
    matchReason: 'Perfect match for your videography, video editing, content creation, and graphic design portfolio.',
    applyLink: 'https://uk.indeed.com/jobs?q=multimedia+content+creator&l=United+Kingdom',
    source: 'Indeed UK'
  },
  {
    title: 'SEO & Content Marketing Assistant',
    company: 'Digital Agency',
    country: 'Ireland',
    visaSponsorship: 'yes',
    matchReason: 'Matches your SEO basics knowledge with content creation and WordPress skills. Great stepping stone role.',
    applyLink: 'https://www.irishjobs.ie/Jobs/SEO-Content-Marketing',
    source: 'IrishJobs.ie'
  },
  {
    title: 'Video Content Producer',
    company: 'Media & Entertainment',
    country: 'UK',
    visaSponsorship: 'yes',
    matchReason: 'Directly uses your videography and video editing expertise. Content production is in high demand in UK.',
    applyLink: 'https://www.cv-library.co.uk/search-jobs?q=video+content+producer',
    source: 'CV-Library UK'
  },
  {
    title: 'WordPress Developer & Content Manager',
    company: 'Web Solutions Agency',
    country: 'Belgium',
    visaSponsorship: 'unknown',
    matchReason: 'Combines your WordPress development skills with content management and SEO knowledge.',
    applyLink: 'https://www.linkedin.com/jobs/search/?keywords=wordpress%20developer&location=Belgium',
    source: 'LinkedIn'
  }
]

export async function POST(request: NextRequest) {
  try {
    const { profile } = await request.json()

    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Filter and return curated jobs
    const matchingJobs = curatedJobs.filter(job =>
      profile.countries.includes(job.country) &&
      !profile.excludeCountries.includes(job.country)
    )

    return NextResponse.json({
      jobs: matchingJobs,
      count: matchingJobs.length
    })
  } catch (error) {
    console.error('Error searching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to search for jobs' },
      { status: 500 }
    )
  }
}
