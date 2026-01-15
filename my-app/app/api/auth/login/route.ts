import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('\n========== LOGIN REQUEST ==========')
    console.log('Credentials:', body)

    // Stap 1: GET de login pagina om CSRF token op te halen
    console.log('[DEBUG] Step 1: GET login page to extract CSRF token...')
    const pageResponse = await fetch('https://v8rfncgr-7160.euw.devtunnels.ms/')
    const pageHtml = await pageResponse.text()
    
    // Zoek naar CSRF token - betere regex
    const tokenMatch = pageHtml.match(/<input[^>]*name="__RequestVerificationToken"[^>]*value="([^"]+)"/)
    const csrfToken = tokenMatch ? tokenMatch[1] : null
    
    console.log('[DEBUG] CSRF Token found:', !!csrfToken)
    if (csrfToken) {
      console.log('[DEBUG] Token preview:', csrfToken.substring(0, 30) + '...')
    } else {
      console.log('[DEBUG] WARNING: CSRF token not found!')
    }

    // Stap 2: POST met form data + CSRF token
    console.log('[DEBUG] Step 2: Sending POST request...')
    
    const formData = new URLSearchParams()
    formData.append('Username', body.username)
    formData.append('Password', body.password)
    if (csrfToken) {
      formData.append('__RequestVerificationToken', csrfToken)
    }

    console.log('[DEBUG] Form data will include:', {
      Username: body.username,
      Password: body.password,
      hasToken: !!csrfToken
    })

    const response = await fetch('https://v8rfncgr-7160.euw.devtunnels.ms/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })

    console.log('[DEBUG] POST Response Status:', response.status, response.statusText)
    console.log('[DEBUG] Location header:', response.headers.get('location'))

    const text = await response.text()
    console.log('[DEBUG] Response body length:', text.length)
    
    // Als het een HTML response is met login form = fout
    if (text.includes('Admin Login') || text.includes('field-validation')) {
      console.error('✗ Login failed - got login form back (invalid credentials?)')
      return NextResponse.json(
        { 
          success: false,
          message: 'Login failed - invalid credentials'
        },
        { status: 401 }
      )
    }
    
    // Redirect of geen login form = succes
    if (response.status === 302 || response.status === 301 || !text.includes('Admin Login')) {
      console.log('✓ Login successful!')
      return NextResponse.json({ 
        success: true, 
        message: 'Login successful'
      }, { status: 200 })
    }

    console.error('✗ Unexpected response')
    return NextResponse.json(
      { 
        success: false,
        message: 'Unexpected response from server'
      },
      { status: 500 }
    )

  } catch (error) {
    console.error('\n!!!!! ERROR !!!!!')
    console.error('Message:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    )
  }
}
