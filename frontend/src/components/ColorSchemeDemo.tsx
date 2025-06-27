import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertTriangle, XCircle, ExternalLink } from 'lucide-react'

export const ColorSchemeDemo: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-app-text-primary">Color Scheme Demonstration</h1>
        <p className="text-app-text-secondary">Your custom color scheme in action</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Colors Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-app-text-primary">Theme Colors</CardTitle>
            <CardDescription>Primary color palette showcase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 bg-app-accent-gold rounded-lg flex items-center justify-center">
                <span className="text-white font-medium">Gold</span>
              </div>
              <div className="h-16 bg-app-accent-hover rounded-lg flex items-center justify-center">
                <span className="text-white font-medium">Hover</span>
              </div>
              <div className="h-16 bg-success rounded-lg flex items-center justify-center">
                <span className="text-white font-medium">Success</span>
              </div>
              <div className="h-16 bg-warning rounded-lg flex items-center justify-center">
                <span className="text-white font-medium">Warning</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-app-text-primary">Buttons & Actions</CardTitle>
            <CardDescription>Interactive elements with theme colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">Primary Button</Button>
            <Button variant="outline" className="w-full">Outline Button</Button>
            <Button variant="secondary" className="w-full">Secondary Button</Button>
            <Button variant="ghost" className="w-full">Ghost Button</Button>
          </CardContent>
        </Card>

        {/* Status Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-app-text-primary">Status Indicators</CardTitle>
            <CardDescription>System states and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-app-text-secondary">Success State</span>
              <Badge className="bg-success text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-app-text-secondary">Warning State</span>
              <Badge className="bg-warning text-white">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Warning
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-app-text-secondary">Error State</span>
              <Badge className="bg-error text-white">
                <XCircle className="w-3 h-3 mr-1" />
                Error
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Text Hierarchy */}
        <Card>
          <CardHeader>
            <CardTitle className="text-app-text-primary">Typography</CardTitle>
            <CardDescription>Text hierarchy and colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <h1 className="text-2xl font-bold text-app-text-primary">Primary Heading</h1>
            <h2 className="text-xl font-semibold text-app-text-primary">Secondary Heading</h2>
            <p className="text-app-text-secondary">Secondary text with muted appearance for supporting information.</p>
            <a href="#" className="text-link hover:underline inline-flex items-center">
              Link Example <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </CardContent>
        </Card>

        {/* Backgrounds */}
        <Card>
          <CardHeader>
            <CardTitle className="text-app-text-primary">Backgrounds</CardTitle>
            <CardDescription>Background colors and surfaces</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-12 bg-app-background border border-border rounded-lg flex items-center justify-center">
              <span className="text-app-text-primary text-sm">Main Background</span>
            </div>
            <div className="h-12 bg-app-background-secondary border border-border rounded-lg flex items-center justify-center">
              <span className="text-app-text-primary text-sm">Secondary Background</span>
            </div>
            <div className="h-12 bg-card border border-border rounded-lg flex items-center justify-center">
              <span className="text-app-text-primary text-sm">Card Background</span>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-app-text-primary">Alerts & Messages</CardTitle>
            <CardDescription>System alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Alert className="border-app-accent-gold/30 bg-app-accent-gold/10">
              <AlertTriangle className="h-4 w-4 text-app-accent-gold" />
              <AlertDescription className="text-app-text-primary">
                This is a custom alert with your gold accent color!
              </AlertDescription>
            </Alert>
            <Alert className="border-success/30 bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription className="text-app-text-primary">
                Success message using theme colors.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Color Variables Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-app-text-primary">Color Variables Reference</CardTitle>
          <CardDescription>CSS custom properties for your color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
            <div className="space-y-2">
              <h3 className="font-semibold text-app-text-primary mb-2">Light Theme</h3>
              <div className="space-y-1 text-app-text-secondary">
                <div>--app-background: #FAFAFA</div>
                <div>--app-background-secondary: #F0F0F0</div>
                <div>--app-text-primary: #111111</div>
                <div>--app-text-secondary: #555555</div>
                <div>--app-accent-gold: #D4AF37</div>
                <div>--app-accent-hover: #BFA334</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-app-text-primary mb-2">Dark Theme</h3>
              <div className="space-y-1 text-app-text-secondary">
                <div>--app-background: #121212</div>
                <div>--app-background-secondary: #1E1E1E</div>
                <div>--app-text-primary: #EAEAEA</div>
                <div>--app-text-secondary: #AAAAAA</div>
                <div>--app-accent-gold: #D4AF37</div>
                <div>--app-accent-hover: #FFD700</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
